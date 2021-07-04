import { useFetchRestaurantQuery } from "../features/api/restaurantsApiSlice";
import AddRestaurants from "./AddRestaurants";

const EditRestaurant = ({ match }) => {
  const restaurantId = match.params.id;
  const { data, isFetching } = useFetchRestaurantQuery(restaurantId);

  return (
    <>
      {isFetching ? (
        <div style={{ position: "relative" }}>
          <div className="spinner"></div>
        </div>
      ) : (
        <AddRestaurants restaurantEdit={data.data.restaurant[0]} isEditMode />
      )}
    </>
  );
};

export default EditRestaurant;
