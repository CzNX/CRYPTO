import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Carousel from "./Carousel";

const Banner = () => {
  const useStyles = makeStyles(() => ({
    banner: {
      background: "url(./banner.jpg)",
    },
    tagline: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      justifyContent: "center",
      height: "40%",
    },
    bannerContent: {
      height: 400,
      display: "flex",
      flexDirection: "column",
      paddingTop: 25,
      justifyContent: "space-around",
    },
  }));

  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              marginBottom: 15,
              fontWeight: "bold",
            }}
          >
            Lorem, ipsum
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "gray",
            }}
          >
            Lorem, ipsum
          </Typography>
        </div>

        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
