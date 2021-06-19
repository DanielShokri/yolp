import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Button,
  Menu,
  InputBase,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MoreIcon from "@material-ui/icons/MoreVert";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { usersContext } from "./../context/userContext";
import { buildPath, routes } from "./../utils/routes";
import useLocalStorage from "./../utils/useLocalStorage";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  marginLeftButtons: {
    marginLeft: "20px",
    marginTop: "2px",
  },
  noLinkTextDec: {
    textDecoration: "none",
    color: "inherit",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Header = () => {
  const { isAuthenticated } = useContext(usersContext);
  const [user, setUser] = useLocalStorage("user");
  const history = useHistory();

  const classes = useStyles();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      {isAuthenticated && user && Object.keys(user).length ? (
        <MenuItem
          onClick={() => {
            history.push(buildPath(routes.userProfile, { id: user?.id }));
          }}
        >
          Hi, {user?.name[0].toUpperCase() + user?.name.substring(1)}
        </MenuItem>
      ) : (
        <MenuItem>
          <Link className={classes.noLinkTextDec} to={routes.login}>
            Login
          </Link>
        </MenuItem>
      )}
      <MenuItem>
        <Link className={classes.noLinkTextDec} to={routes.homePage}>
          Home
        </Link>
      </MenuItem>
      <MenuItem>
        <Link className={classes.noLinkTextDec} to={routes.addRestaurant}>
          Add Restaurant
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar color="transparent" position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link className={classes.noLinkTextDec} to="/">
              YOLP
            </Link>
          </Typography>
          <div className={classes.sectionDesktop}>
            <div className={classes.marginLeftButtons}>
              <Button>
                <Link className={classes.noLinkTextDec} to="/">
                  Home
                </Link>
              </Button>
              <Button>
                <Link className={classes.noLinkTextDec} to="/restaurants/add">
                  Add Restaurant
                </Link>
              </Button>
            </div>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {isAuthenticated && user && Object.keys(user).length ? (
              <Button
                onClick={() => {
                  history.push(buildPath(routes.userProfile, { id: user?.id }));
                }}
              >
                Hi, {user?.name[0].toUpperCase() + user?.name.substring(1)}
              </Button>
            ) : (
              <Button>
                <Link className={classes.noLinkTextDec} to={routes.login}>
                  Login
                </Link>
              </Button>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
    </div>
  );
};

export default Header;
