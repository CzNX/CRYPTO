import axios from "axios";
import { useEffect, useState } from "react";
import { CoinList } from "../api";
import { CryptoState } from "../Context";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  Container,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router";
import Pagination from "@material-ui/lab/Pagination";

const CoinsTable = () => {
  const { currency, symbol } = CryptoState();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
    primary: {
      main: "#fff",
    },
  });

  const useStyles = makeStyles((theme) => ({
    textfield: {
      [theme.breakpoints.up("sm")]: {
        // styles
        width: "70%",
      },
    },
    pagination: {
      display: "grid",
      placeItems: "center",
      marginTop: 20,
      paddingBottom: 20,
      width: "100%",
    },
    content: {
      [theme.breakpoints.down("sm")]: {
        // styles
        display: "none",
      },
      [theme.breakpoints.up("sm")]: {
        // styles
        display: "flex",
        flexDirection: "column",
      },
    },

    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "Montserrat",
    },
  }));
  const classes = useStyles();

  const handleSearch = () =>
    coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  const history = useHistory();
  const numberWithCommas = (x) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleChange = (event, value) => {
    setPage(value);
    window.scroll(0, 450);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{
            margin: 18,
          }}
        >
          Lorem ipsum dolor sit amet.
        </Typography>

        <TextField
          label="Search a crypto currency"
          variant="outlined"
          style={{
            marginBottom: 18,
          }}
          className={classes.textfield}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ background: "gold" }} />
          ) : (
            <Table>
              <TableHead
                style={{
                  background: "#EEBC1D",
                }}
              >
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: 700,
                      }}
                      key={head}
                      align={head === "Coin" ? "left" : "center"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    let profit = row.price_change_percentage_24h >= 0;
                    return (
                      <TableRow
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                          component="th"
                          scope="row"
                        >
                          <img
                            height="50"
                            style={{ marginBottom: 10 }}
                            src={row?.image}
                            alt="err"
                          />
                          <div className={classes.content}>
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          {symbol}
                          {numberWithCommas(row?.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red,",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="center">
                          {symbol}
                          {numberWithCommas(
                            row?.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <div className={classes.pagination}>
          <Pagination
            count={(handleSearch()?.length / 10).toFixed(0)}
            page={page}
            onChange={handleChange}
          />
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
