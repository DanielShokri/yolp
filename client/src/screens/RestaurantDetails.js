import { useEffect, useState, useContext, useMemo } from "react";
import { Typography, Grid, Button, Divider, Chip } from "@material-ui/core";
import HeroSection from "../components/HeroSection";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import MenuCard from "../components/MenuCard";
import StarRating from "../components/StarRating";
import ReviewCard from "../components/ReviewCard";
import { routes, buildPath } from "./../utils/routes";
import { useHistory } from "react-router";
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { AlertContext } from "./../context/AlertContext";
import { AlertFail } from "../components/Alert";
import { AlertSuccess } from "./../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurant } from "../features/restaurants/restaurantsSlice";
import { useFetchRestaurantQuery } from "../features/api/restaurantsApiSlice";
import { handleSaveToFavorite } from "../features/users/usersSlice";
import { handleRemoveFromFavorite } from "./../features/users/usersSlice";
import "../styles/RestaurantDetails.css";
import { priceRangeText } from "./../utils/constants";

const RestaurantDetails = (props) => {
  let history = useHistory();
  const { match } = props;
  const restaurantId = match.params.id;
  const { setOpenError, setOpen } = useContext(AlertContext);

  // Request the selected restaurant details
  const dispatch = useDispatch();
  const { restaurant } = useSelector((state) => state.restaurants);
  const { user, isAuthenticated } = useSelector((state) => state.users);
  const { data, isFetching, isSuccess } = useFetchRestaurantQuery(
    restaurantId,
    {
      keepUnusedDataFor: 0,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );
  // States
  const [restaurantReviews, setRestaurantReviews] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [showMoreCount, setShowMoreCount] = useState(3);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isFetching && isSuccess) {
      dispatch(setRestaurant(data.data.restaurant[0]));
      setRestaurantReviews(data.data.reviews);
    }
  }, [isFetching, isSuccess]);

  const handleSaveOrDeleteFavorite = async (isDelete) => {
    if (isAuthenticated && user.id) {
      if (!isDelete) {
        dispatch(
          handleSaveToFavorite({
            restaurant_id: restaurantId,
            user_id: user.id,
          })
        );
      } else {
        dispatch(
          handleRemoveFromFavorite({
            restaurant_id: restaurantId,
            user_id: user.id,
          })
        );
      }
    } else {
      setErrorMsg("You need to sign in to add favorites!");
      setOpenError(true);
    }
  };

  useEffect(() => {
    if (Object.keys(restaurant).length !== 0) {
      const time = format(new Date(), "HH:mm");

      const startTime = format(new Date(restaurant.opening_time), "HH:mm");

      const endTime = format(new Date(restaurant.closing_time), "HH:mm");

      // const opening = Date.parse(restaurant.opening_time);
      // const closing = Date.parse(restaurant.closing_time);

      if (time >= startTime && time <= endTime) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    }
  }, [restaurant]);

  const renderFavoriteButton = useMemo(() => {
    return Object.keys(user).length !== 0 &&
      user.favorites &&
      Object.keys(user?.favorites).length !== 0 &&
      user?.favorites.some(
        (fav) => fav && fav.restaurant_id === restaurantId
      ) ? (
      <Button
        className="button-spacing"
        variant="outlined"
        color="default"
        size="large"
        startIcon={<BookmarkBorderIcon fontSize="large" />}
        onClick={() => handleSaveOrDeleteFavorite(true)}
      >
        remove from favorites
      </Button>
    ) : (
      <Button
        className="button-spacing"
        variant="outlined"
        color="default"
        size="large"
        startIcon={<BookmarkBorderIcon fontSize="large" />}
        onClick={() => handleSaveOrDeleteFavorite(false)}
      >
        add to favorites
      </Button>
    );
  }, [user, restaurantId]);

  return (
    <>
      <AlertFail>{errorMsg}</AlertFail>
      <AlertSuccess>Successfully added to your favorites!</AlertSuccess>

      <>
        <HeroSection height="400">
          <div className="restaurant-details-content">
            <Typography
              className="mtb-20"
              variant="h1"
              style={{ fontWeight: "700" }}
            >
              {restaurant.name}
            </Typography>
            {restaurant.average_rating && (
              <>
                <StarRating
                  review={restaurant.average_rating}
                  className="mtb-20"
                  disable={true}
                />
              </>
            )}

            <div className="mtb-20 flex-basis">
              <Chip
                size="medium"
                color={isOpen ? "primary" : "secondary"}
                label={isOpen ? "Open" : "Close"}
              />
              <span style={{ fontWeight: "700" }}>
                {restaurant.opening_time &&
                  format(new Date(restaurant.opening_time), "HH:mm", {
                    locale: he,
                  })}{" "}
                -
                {restaurant.opening_time &&
                  format(new Date(restaurant.closing_time), "HH:mm", {
                    locale: he,
                  })}
              </span>
            </div>
            <Chip
              icon={<MonetizationOnIcon />}
              label={priceRangeText[restaurant.price_range]}
            />
          </div>
        </HeroSection>

        <div className="biz-details-page-container">
          <Grid container align="left">
            <div className="button-container">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className="review-button"
                startIcon={<StarBorderIcon fontSize="large" />}
                onClick={() =>
                  history.push(
                    buildPath(routes.addReview, { id: restaurantId })
                  )
                }
              >
                Write a Review
              </Button>

              {Object.keys(user).length !== 0 ? (
                renderFavoriteButton
              ) : (
                <Button
                  className="button-spacing"
                  variant="outlined"
                  color="default"
                  size="large"
                  startIcon={<BookmarkBorderIcon fontSize="large" />}
                  onClick={() => handleSaveOrDeleteFavorite(false)}
                >
                  add to favorites
                </Button>
              )}

              <Button
                className="button-spacing"
                variant="outlined"
                color="default"
                size="large"
                startIcon={<EditOutlinedIcon fontSize="large" />}
                onClick={() =>
                  history.push(
                    buildPath(routes.editRestaurant, {
                      id: restaurantId,
                    })
                  )
                }
              >
                EDIT
              </Button>
            </div>
          </Grid>
          <Divider />
          <Grid container alignContent="flex-end">
            <Typography className="button-container" variant="h4" align="left">
              Menu
            </Typography>
          </Grid>
          <Grid className="menu-container" container alignContent="center">
            <MenuCard />
            <MenuCard />
          </Grid>
          <Divider />
          <Grid container alignContent="flex-end">
            <Typography className="button-container" variant="h4" align="left">
              Reviews
            </Typography>
          </Grid>
          <Grid container alignContent="center">
            {Object.keys(restaurantReviews).length !== 0 ? (
              restaurantReviews.slice(0, showMoreCount).map((review) => (
                <div key={review.review} style={{ margin: "0 10px" }}>
                  <ReviewCard review={review} />
                </div>
              ))
            ) : (
              <Typography variant="h6">No reviews yet!</Typography>
            )}
          </Grid>
          <Grid item align="center">
            <Button
              disabled={restaurantReviews.length <= showMoreCount}
              onClick={() => setShowMoreCount((state) => (state += 3))}
              style={{ margin: "40px 0" }}
            >
              Show More
            </Button>
          </Grid>
        </div>
      </>
    </>
  );
};

export default RestaurantDetails;
