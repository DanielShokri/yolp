import { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import authApi from "./api/authApi";
// Screens
import AddRestaurants from "./screens/AddRestaurants";
import Header from "./components/Header";
import HomePage from "./screens/HomePage";
import RestaurantDetails from "./screens/RestaurantDetails";
import AddRating from "./screens/AddRating";
import SearchResults from "./screens/SearchResults";
import RegisterPage from "./screens/Register";
import UserProfile from "./screens/UserProfile";
// Materiel ui
import { Grid } from "@material-ui/core";
import { routes } from "./utils/routes";
import LoginPage from "./screens/Login";
// Context
import { usersContext } from "./context/userContext";
import { AlertContext } from "./context/AlertContext";
import { AlertInfo } from "./components/Alert";

function App(props) {
  const { setIsAuthenticated, isAuthenticated, user } =
    useContext(usersContext);
  const { setOpenInfo } = useContext(AlertContext);

  useEffect(() => {
    async function checkIfAuth() {
      try {
        const res = await authApi.get("/is-verify", {
          headers: { Authorization: user?.token },
        });
        setIsAuthenticated(res.data);
      } catch (error) {
        setOpenInfo(true);
      }
    }
    checkIfAuth();
  }, [user?.token]);

  return (
    <div className="App">
      <Router>
        <Header />
        <AlertInfo>Sign In to enjoy the full features of the site!</AlertInfo>
        <Grid align="center">
          <Switch>
            <Route exact path={routes.homePage} component={HomePage} />
            <Route path={routes.addRestaurant} component={AddRestaurants} />
            <Route
              path={routes.restaurantDetails}
              component={RestaurantDetails}
            />
            <Route path={routes.addReview} component={AddRating} />
            <Route path={routes.searchResults} component={SearchResults} />
            <Route
              path={routes.login}
              component={isAuthenticated ? HomePage : LoginPage}
            />
            <Route
              path={routes.register}
              component={isAuthenticated ? HomePage : RegisterPage}
            />
            <Route path={routes.userProfile} component={UserProfile} />
          </Switch>
        </Grid>
      </Router>
    </div>
  );
}

export default App;
