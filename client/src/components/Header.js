import { makeStyles } from "@material-ui/core/styles";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 0,
    margin: "0 15px",
  },
}));

const Header = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <AppBar style={{ background: "#1b1717" }} position="static">
          <Toolbar>
            {/* <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton> */}
            <img width="75" src="/images/logo.png" alt="logo" />
            <Typography variant="h6" className={classes.title}>
              <Link className="nav-links" to="/">
                Home
              </Link>
            </Typography>
            <Typography variant="h6" className={classes.title}>
              <Link className="nav-links" to="/restaurants/add">
                Add Restaurant
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
};

export default Header;
