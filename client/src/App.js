import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddRestaurants from "./screens/AddRestaurants";
import Header from "./components/Header";
import HomePage from "./screens/HomePage";
import RestaurantDetails from "./screens/RestaurantDetails";
import AddRating from "./screens/AddRating";
import SearchResults from "./screens/SearchResults";
import { Grid } from "@material-ui/core";
import { RestaurantsContextProvider } from "./context/RestaruantsContext";
import { AlertContextProvider } from "./context/AlertContext";
import { routes } from "./utils/routes";

function App() {
  return (
    <RestaurantsContextProvider>
      <AlertContextProvider>
        <div className="App">
          <Router>
            <Header />
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
              </Switch>
            </Grid>
          </Router>
        </div>
      </AlertContextProvider>
    </RestaurantsContextProvider>
  );
}

export default App;
