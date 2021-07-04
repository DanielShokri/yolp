import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, Typography, Badge } from "@material-ui/core";
import { useHistory } from "react-router";
import StarRating from "./StarRating";
import { routes, buildPath } from "./../utils/routes";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/restaurants/restaurantsSlice";
import "../styles/Card.css";

const Card = ({ restaurant, handleDelete }) => {
  let history = useHistory();
  const dispatch = useDispatch();

  const deleteRestaurant = () => {
    const restToDelete = {
      id: restaurant.id,
      name: restaurant.name,
    };
    handleDelete(restToDelete);
  };

  return (
    <div className="card-container">
      <div className="card">
        <div className="card-photo">
          <div
            className="photo-box"
            style={{
              backgroundImage: `url(${
                restaurant.restaurant_image
                  ? restaurant.restaurant_image
                  : "/images/placeholder-image.png"
              })`,
            }}
          ></div>
        </div>
        <div className="card-body">
          <div className="card-content">
            <h3 className="card_content-title--linked">
              <div
                onClick={() => {
                  dispatch(setRestaurant(restaurant));
                  history.push(
                    buildPath(routes.restaurantDetails, { id: restaurant.id })
                  );
                }}
              >
                {restaurant.name.replace(/\w/, (c) => c.toUpperCase())}
              </div>
            </h3>
            {restaurant.average_rating ? (
              <Badge badgeContent={restaurant.review_count} color="error">
                <StarRating
                  review={restaurant.average_rating}
                  disableBox={true}
                  disable={true}
                />
              </Badge>
            ) : (
              <Typography>No reviews yet!</Typography>
            )}
            <div className="price-category">
              <div className="category-str-list">{restaurant.location}</div>
            </div>
            <div className="biz-location">
              <div className="category-str-list">
                Price: {"$".repeat(restaurant.price_range)}
              </div>
            </div>
            <div className="card-actions-container">
              <div className="card-action">
                <IconButton
                  onClick={deleteRestaurant}
                  color="secondary"
                  children={<DeleteIcon />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
