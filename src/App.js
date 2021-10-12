import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./comps/Header";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import { makeStyles } from "@material-ui/core/styles";

function App() {
  const useStyles = makeStyles({
    root: {
      backgroundColor: "#14161a",
      color: "#fff",
      minHeight: "100vh",
    },
  });

  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <Header />
        <Switch>
          <Route path="/coins/:id" exact component={Detail} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
