import Card from "./Card";
import {Button, Grid, Typography} from "@mui/material";
import {useContext, useState} from "react";
import {AlertFail, AlertSuccess} from "./Alert";
import {AlertContext} from "./../context/AlertContext";
import {useDispatch} from "react-redux";
import {handleDeleteRestaurant} from "./../features/restaurants/restaurantsSlice";

const RestaurantsList = ({ restaurantsList, isSearchList }) => {
  const [showMoreCount, setShowMoreCount] = useState(6);
  // const { restaurants } = useSelector((state) => state.restaurants);
  const [restaurantToDelete, setRestaurantToDelete] = useState({});
  const { setOpen, setOpenError } = useContext(AlertContext);
  const dispatch = useDispatch();

  const handleDelete = async (restToDelete) => {
    setRestaurantToDelete(restToDelete);

    try {
      dispatch(handleDeleteRestaurant({ restToDeleteId: restToDelete.id }))
        .then(() => {
          setOpen(true);
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
      <AlertSuccess>
        {restaurantToDelete.name} was successfully deleted!
      </AlertSuccess>
      <AlertFail />
      {isSearchList ? (
        <Typography variant="h4" className="m-30">
          Search Results ({restaurantsList.length})
        </Typography>
      ) : (
        <Typography variant="h4" className="m-30">
          Recent Restaurants
        </Typography>
      )}
      <Grid container alignItems="center" justify="center" spacing={4}>
        {restaurantsList.slice(0, showMoreCount).map((restaurant) => (
          <Grid item xs={12} sm={6} md={3} key={restaurant.id}>
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
