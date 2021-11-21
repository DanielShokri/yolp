import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
// Screens
import AddRestaurants from "./screens/AddRestaurants";
import Header from "./components/Header";
import HomePage from "./screens/HomePage";
import RestaurantDetails from "./screens/RestaurantDetails";
import AddRating from "./screens/AddRating";
import SearchResults from "./screens/SearchResults";
import RegisterPage from "./screens/Register";
import UserProfile from "./screens/UserProfile";
import EditRestaurant from "./screens/EditRestaurant";
import LoginPage from "./screens/Login";
import {routes} from "./utils/routes";

// Materiel ui
import {Grid} from "@mui/material";

// Context
import {AlertInfo} from "./components/Alert";
import {useAuth} from "./utils/useAuth";

function App() {
  const { isAuthenticated } = useSelector((state) => state.users);
  useAuth();

  return (
    <div className="App">
      <Router>
        <Header />
        <AlertInfo>Sign In to enjoy the full features of the site!</AlertInfo>
        <Grid align="center">
          <Switch>
            <Route exact path={routes.homePage} component={HomePage} />
            <Route path={routes.addRestaurant} component={AddRestaurants} />
            <Route path={routes.editRestaurant} component={EditRestaurant} />
            <Route path={routes.addReview} component={AddRating} />
            <Route
              path={routes.restaurantDetails}
              component={RestaurantDetails}
            />
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
