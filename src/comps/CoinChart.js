import { CircularProgress, makeStyles } from "@material-ui/core";
import axios from "axios";

import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { HistoricalChart } from "../api";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";
import { CryptoState } from "../Context";
import SelectBtn from "./SelectBtn";

const CoinChart = () => {
  const [history, setHistory] = useState();
  const [days, setDays] = useState(1);
  const { currency, symbol } = CryptoState();
  const { id } = useParams();

  // const [search, setSearch] = useState("");

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      marginTop: 25,
      padding: 40,
      width: "75%",
      [theme.breakpoints.down("md")]: {
        // styles
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));
  const classes = useStyles();

  const fetchHistory = async () => {
    const { data } = await axios(HistoricalChart(id, days, currency));
    setHistory(data.prices);
  };

  useEffect(() => {
    fetchHistory();
  }, [currency, id, days]);

  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
    primary: {
      main: "#fff",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {/* chart */}

        {!history ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: history.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  console.log(time);

                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: history.map((coin) => coin[1]),
                    label: `Price (Past ${days} Day's) in ${currency}`,
                    borderColor: "#EEBC1D",
                    fill: false,
                    backgroundColor: "rgb(255, 99, 132)",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </>
        )}

        {/* btns */}
        <div
          style={{
            display: "flex",
            marginTop: 20,
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {chartDays.map((day) => (
            <SelectBtn
              key={day.value}
              onClick={() => setDays(day.value)}
              selected={day.value === days}
            >
              {day.label}
            </SelectBtn>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CoinChart;

export const chartDays = [
  {
    label: "24 Hours",
    value: 1,
  },
  {
    label: "30 Days",
    value: 30,
  },
  {
    label: "3 Months",
    value: 90,
  },
  {
    label: "1 Year",
    value: 365,
  },
];
