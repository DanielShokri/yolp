import { useState, useEffect, useContext } from "react";
import HeroSection from "./../components/HeroSection";
import {
  MenuItem,
  Button,
  Typography,
  TextField,
  Grid,
  CssBaseline,
  Avatar,
  Container,
} from "@material-ui/core";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { AlertSuccess, AlertFail } from "./../components/Alert";
import { reviewOptions } from "../utils/constants";
import { AlertContext } from "./../context/AlertContext";
import useForm from "./../utils/useForm";
import restaurantsApi from "../api/restaurantsApi";
import { useStylesForm } from "./../utils/constants";
import { routes, buildPath } from "./../utils/routes";
import { useDispatch, useSelector } from "react-redux";
import { useFetchRestaurantQuery } from "../features/api/restaurantsApiSlice";
import { setRestaurant } from "../features/restaurants/restaurantsSlice";

const AddRating = (props) => {
  console.log("enter the review state");
  const { match, history } = props;
  const restaurantId = match.params.id;
  const { restaurant } = useSelector((state) => state.restaurants);
  const classes = useStylesForm();
  const dispatch = useDispatch();
  const { setOpen, setOpenError } = useContext(AlertContext);
  const { data, isFetching } = useFetchRestaurantQuery(restaurantId);

  useEffect(() => {
    if (!isFetching) {
      dispatch(setRestaurant(data.data.restaurant[0]));
    }
  }, [isFetching]);

  const handleReviewPost = async () => {
    try {
      const res = await restaurantsApi.post(`/${restaurantId}/addReview`, {
        ...inputs,
        user_id: "8",
      });
      if (res.status === 201) setOpen(true);
      else setOpenError(true);
    } catch (error) {
      setOpenError(true);
      console.log(error);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(handleReviewPost);
  if (isFetching)
    return (
      <div style={{ position: "relative" }}>
        <div className="spinner"></div>
      </div>
    ); 
  return (
    <>
      <AlertSuccess>The review was posted successfully </AlertSuccess>
      <AlertFail />

      <HeroSection>
        <Typography variant="h3" className="m-30">
          Add a Review - {restaurant.name}
        </Typography>
      </HeroSection>

      <form onSubmit={handleSubmit}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <RateReviewIcon />
            </Avatar>
            <Typography className="mtb-20" component="h1" variant="h5">
              Review
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  autoFocus
                  onChange={handleInputChange}
                  label="Full Name"
                  name="name"
                  required
                  value={inputs?.name || ""}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  value={inputs?.rating || 1}
                  select
                  label="Rating"
                  name="rating"
                  onChange={handleInputChange}
                  helperText="Please select your opinion"
                >
                  {reviewOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="review"
                  rowsMax={4}
                  multiline
                  value={inputs?.review || ""}
                  onChange={handleInputChange}
                  label="Review"
                />
              </Grid>
            </Grid>
            <Grid container justify="space-around">
              <Grid item>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  onClick={() =>
                    history.push(
                      buildPath(routes.restaurantDetails, {
                        id: restaurantId,
                      })
                    )
                  }
                >
                  back
                </Button>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  POST REVIEW
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </form>
    </>
  );
};

export default AddRating;
