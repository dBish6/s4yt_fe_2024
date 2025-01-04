import errorHandler from "@services/errorHandler";

import { SET_COUNTRIES, SET_REGIONS, SET_CITIES } from "@actions/index";

export const getCountries = () => async (dispatch, _) => {
  try {
    const countries = (await import("@constants/COUNTRIES")).default;
    dispatch({ type: SET_COUNTRIES, payload: countries });
  } catch (error) {
    errorHandler("getCountries", error);
  }
};

export const getRegions = (countryName) => async (dispatch, _) => {
  try {
    dispatch({ type: SET_REGIONS, payload: [] }); // This is here for loading the field in the form.
    let selected = (await import("@constants/REGIONS")).default.find(
      (region) => region.countryName === countryName
    );
    selected = selected?.regions || "No regions was found from your selected country, you can skip this step.";

    dispatch({ type: SET_REGIONS, payload: selected });
  } catch (error) {
    errorHandler("getRegions", error);
  }
};

export const getCities = (regionName) => async (dispatch, _) => {
  try {
    dispatch({ type: SET_CITIES, payload: [] });
    let cities = (await import("@constants/CITIES")).default.filter(
      (city) => city.region_name === regionName
    );
    if (!cities.length) cities = "No cities was found from your selected region, you can skip this step.";

    dispatch({ type: SET_CITIES, payload: cities });
  } catch (error) {
    errorHandler("getCities", error);
  }
};
