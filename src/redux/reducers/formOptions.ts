import { SET_COUNTRIES, SET_REGIONS, SET_CITIES } from "@actions/index";

export interface FormOptionsState {
  countries: {
    name: string;
    abbr: string;
    callingCode: string;
    continent: string;
  }[];
  regions: { name: string; abbr: string }[];
  cities: { name: string; region_name: string; country_name: string }[];
}

const initialState: FormOptionsState = {
  countries: [],
  regions: [],
  cities: []
};

const formOptions = (
  state = initialState,
  action: { type: string; payload: { id: number; name: string }[] }
) => {
  switch (action.type) {
    case SET_COUNTRIES:
      return { ...state, countries: action.payload };
    case SET_REGIONS:
      return { ...state, regions: action.payload };
    case SET_CITIES:
      return { ...state, cities: action.payload };
    default:
      return state;
  }
};

export default formOptions;
