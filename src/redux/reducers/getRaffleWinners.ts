import { GET_RAFFLE_WINNERS } from "@actions/index";

export interface RaffleWinners {
  name: string;
  country_name: string;
  country_code: string;
  region_name?: string;
}

export interface RaffleItem {
  item_src: string;
  partner_logo: string;
  name: string;
  winners: RaffleWinners[];
}

const initialState: RaffleItem[] = [];

const getRaffleWinners = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case GET_RAFFLE_WINNERS:
      return  action.payload;
    default:
      return state;
  }
};

export default getRaffleWinners;
