import { UserReduxState } from "@reducers/user";
import NotificationValues from "@root/typings/NotificationValues";

import { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import { isNotPlayer } from "@actions/user";
import { addNotification } from "@actions/notifications";

import history from "@utils/History";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";
import Image from "@components/Image";
// import More from "./More";

import s from "./styles.module.css";

interface PlayerProps {
  quizSubmitted?: number;
  isNotPlayer: (useNotification?: boolean, message?: string) => boolean;
  addNotification: (notification: Omit<NotificationValues, "id">) => void;
}

const chests = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answers: {
      choice: {
        a: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        b: "Ut enim ad minim veniam, quis nostrud exercitation",
        c: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      correct: "a"
    }
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answers: {
      choice: {
        a: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        b: "Ut enim ad minim veniam, quis nostrud exercitation",
        c: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      correct: "b"
    }
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answers: {
      choice: {
        a: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        b: "Ut enim ad minim veniam, quis nostrud exercitation",
        c: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      correct: "a"
    }
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answers: {
      choice: {
        a: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        b: "Ut enim ad minim veniam, quis nostrud exercitation",
        c: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      correct: "b"
    }
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answers: {
      choice: {
        a: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        b: "Ut enim ad minim veniam, quis nostrud exercitation",
        c: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      correct: "c"
    }
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    answers: {
      choice: {
        a: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        b: "Ut enim ad minim veniam, quis nostrud exercitation",
        c: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      },
      correct: "c"
    }
  }
];

// TODO:
const LearnAndEarn: React.FC<PlayerProps> = ({
  quizSubmitted,
  isNotPlayer,
  addNotification
}) => {
  const [selected, setSelected] = useState<number | null>(null),
    scoreRef = useRef("0");

  const notPlayerRole = isNotPlayer();

  return (
    <Layout>
      <Header title="Learn and Earn" />
      <Content
        // addCoins={clicked.more || clicked.quizDone ? "coins2" : "coins3"}
        // addFeather={clicked.more || clicked.quizDone ? undefined : "left"}
        // {...(!clicked.more &&
        //   !clicked.quizDone && { style: { paddingBottom: "4px" } })}
        addCoins="coins3"
        addFeather="left"
      >
        <div className={s.preGame}>
          {chests.map((chest, i) => (
            <button
              className={`${s.chest} fade`}
              onClick={() =>
                // FIXME: Wtf is going on here with the use of two isNotPlayer??
                notPlayerRole
                  ? isNotPlayer(true, "Only players can win more Dubl-U-Nes")
                  : quizSubmitted
                  ? addNotification({
                      error: true,
                      content: "Quiz was already submitted",
                      close: false,
                      duration: 4000
                    })
                  : setSelected(i)
              }
              // {...(quizSubmitted && { "data-submitted": true })}
              {...(notPlayerRole && { style: { cursor: "not-allowed" } })}
            />
          ))}
        </div>
      </Content>
      <Status className={s.status}
        // style={
        //   isSmallerThen500 && clicked.quizDone ? { marginTop: "6rem" } : {}
        // }
      />
    </Layout>
  );
};

const mapStateToProps = ({ user }: { user: UserReduxState }) => ({
  // TODO:
  quizSubmitted: user.credentials?.quiz_submitted
});
const mapDispatchToProps = (dispatch: Function) => ({
  isNotPlayer: (useNotification?: boolean, message?: string) =>
    dispatch(isNotPlayer(useNotification, message)),
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(LearnAndEarn);
