import { Typography, Grid, Button, Divider, Chip } from "@material-ui/core";
import { useEffect, useState } from "react";
import restaruantsApi from "../api/restaruantsApi";
import HeroSection from "../components/HeroSection";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MenuCard from "../components/MenuCard";
import AddRestaurants from "./AddRestaurants";
import StarRating from "../components/StarRating";
import ReviewCard from "../components/ReviewCard";
import { routes, buildPath } from "./../utils/routes";
import { useHistory } from "react-router";
import "../styles/RestaurantDetails.css";
import { format } from "date-fns";
import { he } from "date-fns/locale";

const RestaurantDetails = (props) => {
  let history = useHistory();
  const { match } = props;
  const restaurantId = match.params.id;
  const [restaurant, setRestaurant] = useState({});
  console.log(
    "🚀 ~ file: RestaurantDetails.js ~ line 21 ~ RestaurantDetails ~ restaurant",
    restaurant
  );
  const [restaurantReviews, setRestaurantReviews] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showMoreCount, setShowMoreCount] = useState(3);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await restaruantsApi.get(`/${restaurantId}`);
        setRestaurant(data.data.restaurant[0]);
        setRestaurantReviews(data.data.reviews);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [restaurantId, isEditMode]);

  return (
    <>
      {!isEditMode ? (
        <>
          <HeroSection height="400">
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
                  format(new Date(restaurant.opening_time), "h:mm", {
                    locale: he,
                  })}{" "}
                -
                {restaurant.opening_time &&
                  format(new Date(restaurant.closing_time), "h:mm", {
                    locale: he,
                  })}
              </span>
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
                <Button
                  className="button-spacing"
                  variant="outlined"
                  color="default"
                  size="large"
                  startIcon={<BookmarkBorderIcon fontSize="large" />}
                >
                  SAVE
                </Button>
                <Button
                  className="button-spacing"
                  variant="outlined"
                  color="default"
                  size="large"
                  startIcon={<EditOutlinedIcon fontSize="large" />}
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  EDIT
                </Button>
              </div>
            </Grid>
            <Divider />
            <Grid container alignContent="flex-end">
              <Typography
                className="button-container"
                variant="h4"
                align="left"
              >
                Menu
              </Typography>
            </Grid>
            <Grid className="menu-container" container alignContent="center">
              <MenuCard />
              <MenuCard />
            </Grid>
            <Divider />
            <Grid container alignContent="flex-end">
              <Typography
                className="button-container"
                variant="h4"
                align="left"
              >
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
      ) : (
        <AddRestaurants
          restaurant={restaurant}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
      )}
    </>
  );
};

export default RestaurantDetails;
