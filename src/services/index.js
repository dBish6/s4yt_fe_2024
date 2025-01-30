import { store } from "@root/store";
import history from "@utils/History";

const DEFAULT_HEADERS = Object.freeze({
  Accept: "application/json",
  "Content-Type": "application/json"
});

const sendRequest = async (method, url, params, body) => {
  const apiUrl = params
      ? `${import.meta.env.VITE_API_BASE_URL}${url}?${new URLSearchParams(params).toString()}`
      : `${import.meta.env.VITE_API_BASE_URL}${url}`,
    tokens = store.getState().user.tokens;

  const response = await fetch(apiUrl, {
    method,
    headers: {
      ...DEFAULT_HEADERS,
      Authorization: `Bearer ${tokens.access}`,
      "x-xsrf-token": tokens.csrf
    },
    ...(body && { body: JSON.stringify(body) })
  });
  if (response?.status === 401) history.push("/error-401");
  else if (response?.status === 403) history.push("/error-403");

  const data = await response.json();

  return { data, meta: response };
};

export const Api = {
  get: (url, params) => sendRequest("GET", url, params),
  post: (url, body) => sendRequest("POST", url, null, body),
  patch: (url, body) => sendRequest("PATCH", url, null, body)
};
