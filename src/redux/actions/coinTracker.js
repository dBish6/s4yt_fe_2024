import { Api } from "@services/index";
import errorHandler, { showError } from "@services/errorHandler";

import {
  CLEAR_RAFFLE_ITEMS,
  INITIALIZE_COINS,
  RAFFLE_ACTIVE_STATE,
  RETRIEVE_COINS,
  SET_RAFFLE_COOLDOWN,
  SET_RAFFLE_ITEMS,
  SPEND_COINS,
} from "@actions/index";
import { updateCurrentUser } from "./user";

// TODO: Everything else but getCoinsGainedHistory need changes.

export const initializeCoins = (data) => (dispatch) => {
  dispatch({ type: INITIALIZE_COINS, payload: data });
};

export const retrieveCoins = (item, numEntries) => (dispatch) => {
  dispatch({
    type: RETRIEVE_COINS,
    payload: { ...(item && { item }), numEntries },
  });
};

export const spendCoins = (item, numEntries) => (dispatch) => {
  dispatch({
    type: SPEND_COINS,
    payload: { ...(item && { item }), numEntries },
  });
};

export const clearRaffleItems = () => {
  return { type: CLEAR_RAFFLE_ITEMS };
};

export const raffleCooldown = (timeOnSubmit) => (dispatch) => {
  dispatch({ type: SET_RAFFLE_COOLDOWN, payload: timeOnSubmit });
};

export const getRaffleItems = () => async (dispatch, getState) => {
  // try {
  //   const res = await Api.get("/raffle");
  //   if (res) {
  //     dispatch({ type: SET_RAFFLE_ITEMS, payload: res.data.raffle_items });
  //   } else {
  //     showError(
  //       res,
  //       dispatch,
  //       "Unexpected server error occurred getting the available raffle items"
  //     );
  //   }
  // } catch (error) {
  //   errorHandler("getRaffleItems", error);
  // }
};
export const setRaffleItems = (raffle) => async (dispatch, getState) => {
  // try {
  //   const res = await Api.post("/raffle/coins", {
  //     raffle: raffle,
  //   });
  //   if (res.success) {
  //     const date = new Date();
  //     dispatch({ type: SET_RAFFLE_COOLDOWN, payload: date });
  //   } else {
  //     showError(
  //       res,
  //       dispatch,
  //       "Unexpected server error allocating coins to raffle items"
  //     );
  //   }
  // } catch (error) {
  //   errorHandler("getRaffleItems", error);
  // }
};

// TODO: Will be used in next commit.
export const checkTotalCoins = () => async (dispatch, _) => {
  let retries = 2;

  const getTotal = async () => {
    try {
      const { data } = await Api.get("/game/player/coins/total");
      dispatch({ type: INITIALIZE_COINS, payload: data.coins });
    } catch (error) {
      if (retries !== 0) {
        retries -= 1;
        if (import.meta.env.DEV)
          console.log(`Failed to check coin total: ${retries} retries left...`);

        await getTotal();
      } else {
        addNotification({
          error: true,
          content: "We were not able to sync any dubl-u-nes (coins) that may have been added while you were away. Please try refreshing the page.",
          close: false,
          duration: 0
        });
        errorHandler("getTotalCoins", error, false);
      }
    }
  }

  await getTotal();
};

export const getCoinsGainedHistory =
  (setCoinsGainedHistory) => async (dispatch, _) => {
    try {
      const { data, meta } = await Api.get("/game/player/coins/history");

      if (meta?.ok) {
        setCoinsGainedHistory(data.coin_details);
      } else {
        showError(
          data,
          meta.status,
          dispatch,
          "Unexpected server error occurred getting your Dubl-u-nes gained history"
        );
      }
    } catch (error) {
      errorHandler("getCoinsGainedHistory", error);
    }
  };

export const sendSponsorQuizCoins =
  (finalScore) => async (dispatch, getState) => {
    // try {
    //   const res = await Api.post("/player/coins/sponsor", {
    //     coins: finalScore,
    //   });

    //   if (res.success) {
    //     dispatch(retrieveCoins(null, finalScore));
    //     dispatch(updateCurrentUser({ quiz_submitted: 1 }));
    //   } else {
    //     showError(
    //       res,
    //       dispatch,
    //       "Unexpected server error occurred updating your Dubl-u-nes from the quiz."
    //     );
    //   }
    // } catch (error) {
    //   errorHandler("sendSponsorQuizCoins", error);
    // }
  };

// Web Sockets
export const coinChangesListener = () => () => {
  socket.on("coin_change", (data) => {
    if (data.coins) retrieveCoins(null, data.coins);
  });
};
