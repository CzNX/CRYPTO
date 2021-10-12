import { makeStyles, withWidth } from "@material-ui/core";

const SelectBtn = ({ children, selected, onClick }) => {
  const useStyles = makeStyles((theme) => ({
    selectBtn: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      cursor: "pointer",
      background: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        background: "gold",
        color: "black",
      },
      width: "22%",
    },
  }));
  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectBtn}>
      {children}
    </span>
  );
};

export default SelectBtn;
