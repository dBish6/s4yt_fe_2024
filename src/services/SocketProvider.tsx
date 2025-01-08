import type { Dispatch } from "redux";
import type { UserReduxState } from "@reducers/user";
import type NotificationValues from "@typings/NotificationValues";

import { connect } from "react-redux"
import { useState, useLayoutEffect } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";

import { addNotification } from "@actions/notifications";

import delay from "@utils/delay";

import OverlayLoader from "@components/loaders/overlayLoader";

interface SocketProviderProps {
  userToken: string | undefined;
  addNotification: (data: Omit<NotificationValues, "id">) => void;
}

export const socket = io(import.meta.env.VITE_API_BASE_URL.replace("/api/v2", ""), {
  autoConnect: false,
  reconnection: false,
  transports: ["websocket", "polling"],
  // withCredentials: true
});

let timeout: NodeJS.Timeout | undefined;
const EstablishConnection = () => new Promise<void>((resolve, reject) => {
  let retries = 9;
  const attemptConnection = () => {
    retries--;

    if (import.meta.env.DEV)
      console.log(
        `Socket instance attempting to establish a connection; ${retries} retries left...`
      );
    socket.connect();

    if (retries === 0) {
      socket.removeAllListeners();
      reject(
        new Error("We couldn't connect to a server resource correctly, some things may not work properly.")
      );
    }
  }

  if (socket.connected) return resolve(); // Resolves early if already connected somehow.
  socket
    .on("connect", () => {
      console.info("Connection established with socket.");

      socket.off("connect");
      socket.off("connect_error");
      resolve();
    })
    .on("connect_error", (error) => {
      console.warn(`Socket instance connection error:\n`, error.message);

      timeout = setTimeout(() => attemptConnection(), 5000);
    });

  attemptConnection(); // Initial
});

const SocketProvider = ({ userToken, addNotification }: SocketProviderProps) => {
  const [connecting, setConnecting] = useState("");

  useLayoutEffect(() => {
    if (userToken) {
      console.log("SOCKET STARTING CONNECTION", userToken)
      // TODO: Msg
      setConnecting("Loading user data");
      delay(29000, () => {
        if (!connecting) setConnecting("Taking longer than expected...");
      });

      EstablishConnection()
        .catch((error) => {
          console.log("ERROR socket end", error);
          addNotification({
            error: true,
            content: error,
            close: false,
            duration: 0
          });
        })
        .finally(() => setConnecting(""));

      return () => clearTimeout(timeout);
    }
  }, [userToken]);
  
  return connecting ? <OverlayLoader text={connecting} /> : <Outlet />;
};

const mapStateToProps = ({ user }: { user: UserReduxState }) => ({
  userToken: user.tokens.access
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  addNotification: (notification: Omit<NotificationValues, "id">) =>
    dispatch(addNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(SocketProvider);
