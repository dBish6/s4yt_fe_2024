import type { Dispatch } from "redux";
import type { ChestGrouping } from ".";

import { useState, useLayoutEffect, useEffect } from "react";
import { connect } from "react-redux";

import { sendLearnAndEarnCoins } from "@actions/coinTracker";

import s from "./styles.module.css";

interface Props {
  selectedChest: ChestGrouping;
  setSelectedChest: React.Dispatch<React.SetStateAction<null>>
  sendLearnAndEarnCoins: (finalScore: number) => Promise<{ data: any; meta: Response }>;
}

const More: React.FC<Props> = ({
  selectedChest,
  setSelectedChest,
  sendLearnAndEarnCoins
}) => {
  const [chest, setChest] = useState<{
    img: HTMLImageElement | null;
    opened: boolean;
  }>({ img: null, opened: false });

  const [stage, setStage] = useState({ iteration: 0, process: false }),
    currentSet = selectedChest[stage.iteration - 1];

  const [earned, setEarned] = useState({ iteration: 3, final: 0 });

  // useEffect(() => {
  //   console.log("stage", stage);
  // }, [stage]);

  // useEffect(() => {
  //   console.log("earned", earned);
  // }, [earned]);

  const onAnswerSelected = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    choice: "a" | "b" | "c",
    answer: Omit<ChestGrouping[number]["answers"], "choice">
  ) => {
    const target = e.currentTarget;

    if (choice === answer.correct) {
      setEarned((prev) => ({
        iteration: 3,
        final: prev.final + prev.iteration
      }));
      setStage((prev) => ({ ...prev, process: true }));
    } else {
      setEarned((prev) => ({ ...prev, iteration: prev.iteration - 1 }));

      // We can't really load this gif like the chest, so I directly change the image. They'll see it or not, that's all I can do.
      target.style.background = `url("/images/learnAndEarn/splash.gif?key=${Date.now().toString()}") no-repeat center center/cover`;
      target.childNodes.forEach((text) => (text as HTMLElement).style.opacity = "0");
      setTimeout(() => {
        target.style.opacity = "0";
        target.style.background = `url("/images/learnAndEarn/bubble.png") no-repeat center center/cover`;
      }, 275);
    }

    target.setAttribute("aria-checked", "true");
  };

  /** 
   * For the gif to always start from the beginning, a unique query parameter `key=${Date.now()}` is added
   * to the image src. This doesn't let the browser cache the gif and playing it from a midway point. We 
   * also need to ensure that it's loaded so they can see it open. The other useEffect below doesn't let 
   * the gif repeat.
   */
  useLayoutEffect(() => {
    const img = new Image();
    img.src = `/images/learnAndEarn/chest.gif?key=${Date.now().toString()}`;
    
    img.onload = () => setChest((prev) => ({ ...prev, img }));
    img.onerror = () => setChest((prev) => ({ ...prev, img, opened: true }));
  }, []);
  useEffect(() => {
    if (chest.img && !chest.opened) {
      const duration = setTimeout(() => {
        setChest((prev) => ({ ...prev, opened: true }));
      }, 600);
      return () => clearTimeout(duration);
    }
  }, [chest.img]);

  /**
   * Waits till process (explanation showing) is over to go to the next stage.
   */
  useEffect(() => {
    if (!stage.process && stage.iteration < 4) {
      setStage((prev) => ({ ...prev, iteration: prev.iteration + 1 }));
    }
  }, [stage.process]);

  /**
   * Opacity/checked resets and extra padding if bubble text is overflowing.
   */
  useEffect(() => {
    const scrollContainers = document.querySelectorAll<HTMLButtonElement>("div[role=radiogroup] #scroll");

    for (const elem of scrollContainers) {
      const bubble = elem.parentElement! as HTMLButtonElement;
      bubble.style.opacity = "1";
      bubble.setAttribute("aria-checked", "false");
      bubble.childNodes.forEach((text) => (text as HTMLElement).style.opacity = "1");

      const isOverflowing = elem.scrollHeight >= 105;
      if (isOverflowing) elem.style.paddingBottom = "3rem";
      else elem.style.paddingBottom = "0";
    }
  }, [chest.opened, stage.iteration]);

  useEffect(() => {
    if (stage.iteration === 4) {
      // TODO: Processing balance/coins loading or just the spinner.
      sendLearnAndEarnCoins(earned.final).then(() => {
        setSelectedChest(null);
      });
    }
  }, [stage.iteration]);

  return (
    <div aria-live="polite" className={s.questions}>
      <button
        aria-label="Previous Page"
        className="backBtn fade move"
        onClick={() =>  setSelectedChest(null)}
      />

      {chest.img ? (
        <div
          id="chest"
          className={s.openedChest}
          data-opened={chest.opened}
          style={{
            background: chest.opened
              ? `url("/images/learnAndEarn/chest-opened.png") no-repeat center center/cover`
              : `url("${chest.img.src}") no-repeat center center/cover`
          }}
        >
          {chest.opened && currentSet && (
            <>
              <div className={s.content}>
                {stage.process ? (
                  <h2 className={s.correct}>
                    Correct
                  </h2>
                ) : (
                  <h2 className={s.questionTxt}>
                    <div>#{stage.iteration}</div>
                    <div>{currentSet.question}</div>
                  </h2>
                )}
                
                <div role="radiogroup">
                  {Object.entries(currentSet.answers.choice).map(([letter, answer]) => {
                    const { choice: _, ...selected } = currentSet.answers;

                    return (
                      <button
                        role="radio"
                        aria-label={`Answer ${letter}, ${answer}`}
                        aria-checked="false"
                        disabled={stage.process}
                        className={s.question}
                        onClick={(e) => onAnswerSelected(e, letter as any, { ...selected })}
                      >
                        <div>{letter}</div>
                        <div id="scroll">
                          <p>{answer}</p>
                        </div>
                      </button>
                    );
                  })}

                  {stage.process && (
                    <div className={s.explanation}>
                      <p>{currentSet.answers.explanation}</p>
                      <p>{stage.iteration}/3 Questions</p>
                      <button
                        aria-controls="chest"
                        className="fade move"
                        onClick={() => setStage((prev) => ({ ...prev, process: false }))}
                      >
                        Proceed
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {stage.process && (
                <div className={s.coinPopup}>
                  <div aria-label="Dubl-u-nes Collected" className={s.coin}>
                    <p>{earned.iteration}</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <p className={s.loading}>Just a moment...</p>
      )}

      {earned.final > 0 && (
        <div aria-label="Total Dubl-u-nes Earned" className={s.coinTotal}>
          <p>{earned.final}</p>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  // TODO:
  sendLearnAndEarnCoins: (finalScore: number) => dispatch(sendLearnAndEarnCoins(finalScore))
});

export default connect(null, mapDispatchToProps)(More);
