import { RaffleItem } from "@reducers/getRaffleWinners";
import s from "./styles.module.css";

interface Props {
  data: RaffleItem[];
}
const Other: React.FC<Props> = ({ data }) => {
  return (
    <ul className={s.otherContainer}>
      {/* {data.items.map((item: any, index: any) => {
        return (
          <li key={index}>
            <div className={s.otherImageContainer}>
              <img src={item.logo} alt={item.name} />
              <img
                className={s.partnerLogo}
                src={item.partnerLogo}
                alt={"Sponsor Logo"}
              />
            </div>
            <div className={s.winnerContainer}>
              {item.winners.map((winner: any, index: number) => {
                // let nameCheck = false;
                // if (winner.country_name.length < 15) {
                //   nameCheck = true;
                // }
                return (
                  <div className={s.singleWinner} key={index}>
                    <h3>{winner.name}</h3>
                    <address>
                      {/* {winner.region_name && `${winner.region_name}, `}
                      {nameCheck
                        ? winner.country_name
                        : winner.country_code}{" "} */}
                        {/* {winner.country}, */}
                        {/* {winner.region} */}
                    {/* </address> */}
                  {/* </div> */}
                {/* ); */}
              {/* })} */}
            {/* </div> */}
          {/* </li> */}
        {/* ); */}
      {/* })} */} 
    </ul>
  );
};

export default Other;
