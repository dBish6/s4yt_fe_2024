import { UserReduxState } from "@reducers/user";
import NotificationValues from "@root/typings/NotificationValues";

import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { isNotPlayer } from "@actions/user";
// import { addNotification } from "@actions/notifications";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";
import Image from "@components/Image";
import Questions from "./Questions";

import s from "./styles.module.css";

import { chests } from "./MOCK_DATA";

interface PlayerProps {
  chestsSubmitted: { [chest_id: string]: boolean };
  isNotPlayer: (useNotification?: boolean, message?: string) => boolean;
  addNotification: (notification: Omit<NotificationValues, "id">) => void;
}

export type ChestGrouping = (typeof chests)[number]["group"];

const handleHover = (e: React.SyntheticEvent<HTMLButtonElement, Event>) => {
  const img = (e.currentTarget.firstChild!.firstChild as HTMLImageElement);
  if (img.complete) img.src = "/images/learnAndEarn/chest-half.png";
  },
  handleBlur = (e: React.SyntheticEvent<HTMLButtonElement, Event>) => {
    const elem = (e.currentTarget.firstChild!.firstChild as HTMLImageElement);
    elem.src = elem.dataset.imgSrc!;
  };

// TODO: I need to get the chests via request.
const LearnAndEarn: React.FC<PlayerProps> = ({ chestsSubmitted, isNotPlayer }) => {
  const [selectedChest, setSelectedChest] = useState<{ id: string; quiz: ChestGrouping } | null>(null),
    [isAnyCompleted, setIsAnyCompleted] = useState(false);

  // TODO: See.
  const handleIsAnyCompleted = (elem: HTMLButtonElement | null) => {
    if (elem && elem.disabled) setIsAnyCompleted(true);
  };

  // useEffect(() => {
  //   console.log("selectedChest", selectedChest);
  // }, [selectedChest]);
  
  return (
    <Layout>
      <Header title="Learn and Earn" />
      <Content
        addCoins="coins3"
        addFeather="left"
        {...(selectedChest && { className: s.base })}
      >
        {selectedChest ? (
          <Questions selectedChest={selectedChest} setSelectedChest={setSelectedChest as any} />
        ) : (
          <div className={s.learn}>
            <h2>Open Up One of the Treasure Chests</h2>

            <ul>
              {chests.map((chestGroup, i) => {
                const imgSrc = `/images/learnAndEarn/${
                  chestsSubmitted[chestGroup.chest_id] ? "chest-golden.png" : "chest-closed"
                }.png`;

                return (
                  <li key={i} className={s.chest}>
                    <button
                      ref={handleIsAnyCompleted}
                      className={`${s.chest} fade`}
                      disabled={chestsSubmitted[chestGroup.chest_id]}
                      onClick={() => {
                        if (isNotPlayer(true, "Only players can win more dubl-u-nes")) return;
                        setSelectedChest({ id: chestGroup.chest_id, quiz: chestGroup.group });
                      }}
                      onMouseEnter={handleHover}
                      onFocus={handleHover}
                      onMouseLeave={handleBlur}
                      onBlur={handleBlur}
                      // {...(chestsSubmitted[chestGroup.chest_id] && { "data-submitted": true })}
                      {...(isNotPlayer() && { style: { cursor: "not-allowed" } })}
                    >
                      <Image
                        data-img-src={imgSrc}
                        src={imgSrc}
                        alt={`Treasure Chest${chestsSubmitted[chestGroup.chest_id] ? " " + "Completed" : ""}`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {isAnyCompleted && <a className={s.spend} />}
          </div>
        )}
      </Content>
      <Status className={s.status} />
    </Layout>
  );
};

const mapStateToProps = ({ user }: { user: UserReduxState }) => ({
  chestsSubmitted: user.credentials?.chests_submitted || {}
});
const mapDispatchToProps = (dispatch: Function) => ({
  isNotPlayer: (useNotification?: boolean, message?: string) =>
    dispatch(isNotPlayer(useNotification, message))
  // addNotification: (notification: Omit<NotificationValues, "id">) =>
  //   dispatch(addNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(LearnAndEarn);
