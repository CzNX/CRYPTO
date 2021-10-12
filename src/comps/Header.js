import {
  AppBar,
  Badge,
  Container,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { CryptoState } from "../Context";

const Header = () => {
  const his = useHistory();
  const { currency, setCurrency } = CryptoState();

  const useStyles = makeStyles((theme) => ({
    title: {
      color: "gold",
      cursor: "pointer",
      // width: "100%",
      flex: 1,
      fontWeight: "bold",
    },
  }));

  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
    primary: {
      main: "#fff",
    },
  });

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h6"
              onClick={() => his.push("/")}
            >
              Xtha Crypto
            </Typography>

            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}

              // value={age}
              // onChange={handleChange}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"PKR"}>PKR</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
