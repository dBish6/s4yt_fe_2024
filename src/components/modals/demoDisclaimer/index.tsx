import { useState } from "react";

import ModalTemplate from "../ModalTemplate";
import s from "./styles.module.css";

const DemoDisclaimerModal: React.FC = () => {
  const [show, setShow] = useState(!localStorage.getItem("block-disclaimer"));
  
  return (
    <>
      <ModalTemplate
        show={show}
        setShow={setShow}
        height={257}
        aria-label="Disclaimer"
      >
        {/* TODO: You could show them what period it is here. */}
        <div className={s.container}>
          <p>
            This is the demo version of the Dollars for Your Thoughts ($4YT)
            event game created for building-U. Since the original event has
            ended, I no longer have access to all the live resources, and the
            original application is now displaying the game end screen
            indefinitely. To make it accessible, this demo cycles between the
            pre-game and game start periods, allowing you to log in with a demo
            user, explore the features, and experience the game without any real
            impact.
          </p>
          <p>
            Also, since the original event is finished, the event results page is
            always available.
          </p>

          <button
            className="fade move"
            onClick={(e) => {
              localStorage.setItem("block-disclaimer", "true");
              e.currentTarget.disabled = true;
            }}
          >
            Don't show this again
          </button>
        </div>
      </ModalTemplate>
    </>
  );
};

export default DemoDisclaimerModal;
