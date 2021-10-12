import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { SingleCoin } from "../api";
import { CryptoState } from "../Context";
import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import CoinChart from "../comps/CoinChart";
import parse from "html-react-parser";
const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState();

  const { currency, symbol } = CryptoState();

  const fetchDetail = async () => {
    const { data } = await axios(SingleCoin(id));

    setDetail(data);
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      [theme.breakpoints.down("md")]: {
        // styles
        flexDirection: "column",
        alignItems: "center",
      },
      display: "flex",
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        // styles
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
    },
    description: {
      width: "100%",
      padding: 20,
      textAlign: "justify",
      [theme.breakpoints.down("md")]: {
        // styles
        textAlign: "center",
      },
    },
    marketData: {
      alignSelf: "start",
      paddingTop: 10,
      width: "100%",
      padding: 20,
      [theme.breakpoints.down("md")]: {
        // styles
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        // styles
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        // styles
        alignItems: "start",
      },
    },
  }));
  const classes = useStyles();

  if (!detail) return <LinearProgress style={{ background: "gold" }} />;
  const numberWithCommas = (x = "") =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={detail?.image?.large}
          alt="err"
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {detail?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {parse(` ${detail?.description?.en?.split(". ")[0]}`)}.
        </Typography>

        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            <Typography variant="h5">{detail?.market_cap_rank}</Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            <Typography variant="h5">
              {symbol}
              {numberWithCommas(
                detail?.market_data?.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            <Typography variant="h5">
              {symbol}
              {numberWithCommas(
                detail?.market_data?.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
      </div>
      {/* chart */}
      <CoinChart detail={detail} />
    </div>
  );
};

export default Detail;
