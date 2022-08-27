import React from "react";

// styles
import styles from "./Coin.module.css";

const Coin = ({
  name,
  image,
  symbol,
  price,
  marketCup,
  priceChange,
  currencySymbol,
}) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={image} alt={name} />
      <span className={styles.name}> {name} </span>
      <span className={styles.symbol}> {symbol.toUpperCase()} </span>
      <span className={styles.currentPrice}>
        {currencySymbol} {price.toLocaleString()}
      </span>
      <span
        className={
          priceChange > 0 ? styles.greenPriceChange : styles.redPriceChange
        }
      >
        {priceChange.toFixed(2)} %
      </span>
      <span className={styles.marketCap}>
        {currencySymbol} {marketCup.toLocaleString()}
      </span>
    </div>
  );
};

export default Coin;
