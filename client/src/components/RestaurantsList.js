import Card from "./Card";
import restaruantApi from "../api/restaruantsApi";
import { Typography, Grid, Button } from "@material-ui/core";
import { useState, useContext } from "react";
import { AlertSuccsess, AlertFail } from "./Alert";
import { AlertContext } from "./../context/AlertContext";
import { RestaurantsContext } from "./../context/RestaruantsContext";

const RestaurantsList = ({ restaurantsList, isSerachList }) => {
  const [showMoreCount, setShowMoreCount] = useState(6);
  const [restaurantToDelete, setRestaurantToDelete] = useState({});
  const { setOpen, setOpenError } = useContext(AlertContext);
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  const handleDelete = async (restToDelete) => {
    setRestaurantToDelete(restToDelete);

    try {
      await restaruantApi
        .delete(`/${restToDelete.id}`)
        .then(() => {
          setOpen(true);
          return setRestaurants(
            restaurants.filter((restaruant) => {
              return restaruant.id !== restToDelete.id;
            })
          );
        })
        .catch(() => {
          setOpenError(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="table-container">
      <AlertSuccsess>
        {restaurantToDelete.name} was successfully deleted!
      </AlertSuccsess>
      <AlertFail />
      {isSerachList ? (
        <Typography variant="h4" className="m-30">
          Search Results ({restaurantsList.length})
        </Typography>
      ) : (
        <Typography variant="h4" className="m-30">
          Recent Restaurants
        </Typography>
      )}
      <Grid container alignItems="center" justify="center" spacing={3}>
        {restaurantsList.slice(0, showMoreCount).map((restaurant) => (
          <Grid item xs={12} sm={6} xl={4} md={6} key={restaurant.id}>
            <Card restaurant={restaurant} handleDelete={handleDelete} />
          </Grid>
        ))}
      </Grid>
      <Grid item align="center">
        <Button
          disabled={restaurantsList.length <= showMoreCount}
          onClick={() => setShowMoreCount((state) => (state += 6))}
          style={{ margin: "40px 0" }}
        >
          Show More
        </Button>
      </Grid>
    </div>
  );
};

export default RestaurantsList;
