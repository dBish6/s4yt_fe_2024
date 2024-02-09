import { Api } from "@services/index";
import { GET_RAFFLE_WINNERS } from "@actions/index";
import errorHandler, { showError } from "@services/errorHandler";

export const getRaffleWinners = () => async (dispatch, getState) => {
  // try {
  //   const res = await Api.get("/raffle/winners");
  //   if (res.success) {
  //     dispatch({ type: GET_RAFFLE_WINNERS, payload: res.data.raffle_items });
  //   } else {
  //     showError(
  //       res,
  //       dispatch,
  //       "Unexpected server error occurred getting the available raffle items"
  //     );
  //   }
  // } catch (error) {
  //   errorHandler("getRaffleWinners", error);
  // }
};
