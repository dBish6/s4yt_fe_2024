import { useEffect } from "react";
import { connect } from "react-redux";
import { getRaffleWinners } from "@actions/getRaffleWinners";
import { RaffleItem } from "@reducers/getRaffleWinners";

import { staticWinners } from "@constants/temporaryDb/winners";

import usePagination from "@hooks/usePagination";

import Layout from "@components/partials/layout";
import Header from "@components/partials/header";
import Content from "@components/partials/content";
import Status from "@components/partials/status";
import Winners from "./EventWinners";
import Other from "./EventOther";

import s from "./styles.module.css";
import Banner from "@static/eventResults/img_thankyou.png";

interface Props {
  otherWinners: RaffleItem[];
  getRaffleWinners: () => Promise<any>;
}

const Results: React.FC<Props> = ({ otherWinners, getRaffleWinners }) => {
 
  const totalPartners = staticWinners.length;
  const {
    currentPage,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
    allPageNumbers,
  } = usePagination({ data: staticWinners, maxPerPage: 1 });
  
  useEffect(() => {
    if (otherWinners.length === 0) {
      getRaffleWinners();
    } 
  }, [getRaffleWinners, otherWinners]);
  return (
    <Layout>
      <Header title="Event Results" />
      <Content addCoins="coins3" addFeather="left">
        <div className={s.resultsContainer}>
          <img
            className={s.bannerImage}
            src={Banner}
            alt="Thank you for participating"
          />

          {currentPage < totalPartners ? (
            <Winners data={currentItems[0]} />
          ) : (
            <Other data={currentItems} />
          )}

          <div className={s.eventSelection}>
            <button
              className={`${s.prevButton} fade move`}
              aria-label="Previous page"
              onClick={() => prevPage()}
            />
            <div>
              {allPageNumbers().map((page, index) => (
                <button
                  className={
                    currentPage === page
                      ? `${s.logoPagination} ${s.logoSelected}`
                      : s.logoPagination
                  }
                  key={page}
                  onClick={() => goToPage(page)}
                >
                  <img
                    src={staticWinners[index]?.logo as any}
                    alt={`Logo of ${staticWinners[index]?.name}`}
                  />
                </button>
              ))}
            </div>
            <button
              className={`${s.nextButton} fade move`}
              aria-label="Next page"
              onClick={() => nextPage()}
            />
          </div>
        </div>
      </Content>
      <Status />
    </Layout>
  );
};

const mapStateToProps = ({
  getRaffleWinners,
}: {
  getRaffleWinners: RaffleItem[];
}) => ({
  otherWinners: getRaffleWinners,
});
const mapDispatchToProps = (dispatch: Function) => ({
  getRaffleWinners: () => dispatch(getRaffleWinners()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Results);
