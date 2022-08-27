import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

//api
import { getCoin } from "../services/api";
import Coin from "./Coin";

//components
import Loading from "./Loading";

// styles
import styles from "./Landing.module.css";

const Landing = () => {
  const [coins, setCoins] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const [value, setValue] = useState({ value: "usd", currencySymbol: "$" });

  const coinsPerPage = 10;
  const pagesVisited = pageNumber * coinsPerPage;
  const pageCount = Math.ceil(coins.length / coinsPerPage);
  const [search, setSearch] = useState("");

  const filterCoins = coins
    .slice(pagesVisited, pagesVisited + coinsPerPage)
    .filter((coin) => coin.name.toLowerCase().includes(search.toLowerCase()));

  const displayCoin = filterCoins.map((coin) => {
    return (
      <Coin
        key={coin.id}
        name={coin.name}
        image={coin.image}
        symbol={coin.symbol}
        price={coin.current_price}
        marketCup={coin.market_cap}
        priceChange={coin.market_cap_change_percentage_24h}
        currencySymbol={value.currencySymbol}
      />
    );
  });

  const currency = [
    { name: "US_dollar", value: "usd", currencySymbol: "$" },
    { name: "Dinar", value: "bhd", currencySymbol: "BHD" },
    { name: "Frank", value: "chf", currencySymbol: "CHF" },
    { name: "Pound", value: "gbp", currencySymbol: "£" },
    { name: "Yuan", value: "cny", currencySymbol: "¥" },
    { name: "Lira", value: "try", currencySymbol: "₺" },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getCoin(value.value);
      setCoins(res);
    };
    fetchApi();
  }, []);

  const searchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const symbol = currency.find((item) => item.value === value).currencySymbol;
    setValue({ value: value, currencySymbol: symbol });
  };

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className={styles.header}>
        <input
          className={styles.input}
          type="text"
          placeholder="search"
          value={search}
          onChange={searchChange}
        />
        <select onChange={handleChange}>
          {currency.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {coins.length ? (
        <div className={styles.coinContainer}>
          <div className={styles.headerTable}>
            <span>Coin</span>
            <span>Symbol</span>
            <span>Price</span>
            <span>24h</span>
            <span>Mkt Cap</span>
          </div>

          {displayCoin}
        </div>
      ) : (
        <Loading />
      )}

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={styles.paginationBttns}
        previousLinkClassName={styles.previousBttn}
        nextLinkClassName={styles.nextBttn}
        disabledClassName={styles.paginationDisable}
        activeClassName={styles.paginationActive}
      />
    </>
  );
};

export default Landing;
