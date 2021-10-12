import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { TrendingCoins } from "../../api";
import { CryptoState } from "../../Context";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
const Carousel = () => {
  const { currency, symbol } = CryptoState();
  const [trending, setTrending] = useState([]);
  const useStyles = makeStyles(() => ({
    carousel: {
      display: "flex",
      alignItems: "center",
      height: "50%",
      justifyContent: "center",
      textAlign: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      justifyContent: "center",
      textAlign: "center",
      color: "white",
      textTransform: "uppercase",
    },
  }));

  const classes = useStyles();

  const fetchTrendingCoins = async () => {
    const { data } = await axios(TrendingCoins(currency));

    setTrending(data);
  };

  const numberWithCommas = (x) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const items = trending.map((item) => {
    let profit = item.price_change_percentage_24h >= 0;
    return (
      <div key={item.id}>
        <Link to={`/coins/${item.id}`} className={classes.carouselItem}>
          <img
            src={item?.image}
            alt="err"
            height="80px"
            style={{ marginBottom: 10 }}
          />
          <span>{item.symbol}</span>
          &nbsp;
          <span
            style={{
              color: profit ? "rgb(14,03,129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {item.price_change_percentage_24h?.toFixed(2)}%
          </span>
          <span style={{ fontSize: 22, fontWeight: 500 }}>
            {symbol}
            {numberWithCommas(item?.current_price.toFixed(2))}
          </span>
        </Link>
      </div>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 3,
    },
    1024: {
      items: 4,
    },
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        disableButtonsControls={true}
        disableDotsControls={true}
        infinite
        autoPlay
        items={items}
        autoPlayInterval={1000}
        animationDuration={1500}
        responsive={responsive}
      />
    </div>
  );
};

export default Carousel;
