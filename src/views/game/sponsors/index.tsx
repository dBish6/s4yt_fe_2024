import { UserReduxState } from "@reducers/user";
import NotificationValues from "@root/typings/NotificationValues";

import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import { isNotPlayer } from "@actions/user";
import { addNotification } from "@actions/notifications";

import sponsors from "@constants/temporaryDb/sponsors";
import history from "@utils/History";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";
import Image from "@components/Image";
import More from "./More";

import s from "./styles.module.css";

interface PlayerProps {
  quizSubmitted?: number;
  isNotPlayer: (useNotification?: boolean, message?: string) => boolean;
  addNotification: (notification: Omit<NotificationValues, "id">) => void;
}

const Sponsors: React.FC<PlayerProps> = ({
  quizSubmitted,
  isNotPlayer,
  addNotification,
}) => {
  const [clicked, setClicked] = useState({ more: false, quizDone: false }),
    scoreRef = useRef("0");

  const [isSmallerThen500, setIsSmallerThen500] = useState(false),
    notPlayerRole = isNotPlayer();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setIsSmallerThen500(true);
      } else {
        setIsSmallerThen500(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout>
      <Header title="Sponsors" />
      <Content
        addCoins={clicked.more || clicked.quizDone ? "coins2" : "coins3"}
        addFeather={clicked.more || clicked.quizDone ? undefined : "left"}
        {...(!clicked.more &&
          !clicked.quizDone && { style: { paddingBottom: "4px" } })}
      >
        {clicked.more ? (
          <More setClicked={setClicked} scoreRef={scoreRef} />
        ) : (
          <>
            <div className={s.sponsors}>
              {sponsors.map((sponsor) => (
                <div key={sponsor.name} className={s.spotlight}>
                  <a
                    className="fade move"
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      key={sponsor.name}
                      src={sponsor.img.src}
                      alt={sponsor.img.alt}
                    />
                  </a>
                  <small>{sponsor.name}</small>
                </div>
              ))}
            </div>

            <div className={s.options}>
              <a
                aria-label="Previous Page"
                className={`${s.backBtn} fade move`}
                onClick={() => history.push(-1)}
              />
              <button
                className={`${s.moreBtn} fade`}
                onClick={() =>
                  notPlayerRole
                    ? isNotPlayer(true, "Only players can win more Dubl-U-Nes")
                    : quizSubmitted
                    ? addNotification({
                        error: true,
                        content: "Quiz was already submitted",
                        close: false,
                        duration: 4000,
                      })
                    : setClicked({ ...clicked, more: true })
                }
                {...(quizSubmitted && { "data-submitted": true })}
                {...(notPlayerRole && { style: { cursor: "not-allowed" } })}
              />
            </div>
          </>
        )}
      </Content>
      <Status
        style={
          isSmallerThen500 && clicked.quizDone ? { marginTop: "6rem" } : {}
        }
      />
    </Layout>
  );
};

const mapStateToProps = ({ user }: { user: UserReduxState }) => ({
  quizSubmitted: user.credentials?.quiz_submitted,
});
const mapDispatchToProps = (dispatch: Function) => ({
  isNotPlayer: (useNotification?: boolean, message?: string) =>
    dispatch(isNotPlayer(useNotification, message)),
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sponsors);
