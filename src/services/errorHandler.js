import { addNotification } from "@actions/notifications";
import history from "@utils/History";

export default (func, error) => {
  console.error(`${func} Request ERROR:\n`, error);
  history.push("/error-500");
};

export const showError = (data, status, dispatch, customMessage) => {
  const message = data.message || "Unexpected Error",
    errorMsg = status >= 500 ? customMessage || message : message;

  dispatch(
    addNotification({
      error: true,
      content: errorMsg,
      close: false,
      duration: 0
    })
  );
};
