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
import { AlertSuccsess, AlertFail } from "./../components/Alert";
import { reviewOptions } from "../utils/constants";
import { AlertContext } from "./../context/AlertContext";
import useForm from "./../utils/useForm";
import restaruantsApi from "../api/restaruantsApi";
import { useStylesForm } from "./../utils/constants";
import { routes, buildPath } from "./../utils/routes";

const AddRating = (props) => {
  const { match, history } = props;
  const restaurantId = match.params.id;
  const classes = useStylesForm();
  const { setOpen, setOpenError } = useContext(AlertContext);
  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await restaruantsApi.get(`/${restaurantId}`);
        setRestaurant(data.data.restaurant[0]);
      } catch (error) {
        setOpenError(true);
        console.log(error);
      }
    }

    fetchData();
  }, [restaurantId, setOpenError]);

  const handleReviewPost = async () => {
    console.log("inputs", inputs);
    try {
      const res = await restaruantsApi.post(
        `/${restaurantId}/addReview`,
        inputs
      );
      if (res.status === 201) setOpen(true);
      else setOpenError(true);
    } catch (error) {
      setOpenError(true);
      console.log(error);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(handleReviewPost);

  return (
    <>
      <AlertSuccsess>The review was posted successfully </AlertSuccsess>
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
