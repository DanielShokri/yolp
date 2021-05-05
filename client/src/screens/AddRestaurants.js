import { useState, useEffect } from "react";
import {
  MenuItem,
  Button,
  Typography,
  TextField,
  Grid,
  CssBaseline,
  Avatar,
  Container,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { KeyboardTimePicker } from "@material-ui/pickers";
import restaruantsApi from "../api/restaruantsApi";
import useForm from "../utils/useForm";
import { useContext } from "react";
import { AlertFail, AlertSuccsess } from "./../components/Alert";
import { AlertContext } from "./../context/AlertContext";
import { options, useStylesForm } from "./../utils/constants";
import HeroSection from "../components/HeroSection";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import { PhotoCamera } from "@material-ui/icons";
import EditIcon from "@material-ui/icons/Edit";
import { routes, buildPath } from "./../utils/routes";
import "../styles/AddRestaurant.css";

const AddRestaurants = ({ restaurant, isEditMode, setIsEditMode, history }) => {
  const classes = useStylesForm();
  const { setOpen, setOpenError } = useContext(AlertContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSource, setImageSource] = useState("");
  const [openingTime, setOpeningTime] = useState(null);
  const [closingTime, setClosingTime] = useState(null);
  let redirectTimeout;

  const handleCapture = ({ target }) => {
    const image = target.files[0];
    setSelectedFile(image);
    handleImageBase64(image);
  };

  const handleImageBase64 = (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      setImageSource(reader.result);
    };
  };

  useEffect(() => {
    return () => clearTimeout(redirectTimeout);
  }, []);

  const handleAddOrEditRestaurant = async () => {
    let restaurantCreatedId;
    const inputsWithImage = imageSource
      ? {
          ...inputs,
          opening_time: openingTime,
          closing_time: closingTime,
          restaurant_image: imageSource,
        }
      : { ...inputs, opening_time: openingTime, closing_time: closingTime };

    if (!isEditMode) {
      try {
        const res = await restaruantsApi.post("/", inputsWithImage);
        restaurantCreatedId = res.data.data.restaurants[0].id;
        if (res.status === 200) setOpen(true);
      } catch (error) {
        setOpenError(true);
        console.log(error);
      }
    } else {
      try {
        const res = await restaruantsApi.put(
          `/${restaurant.id}`,
          inputsWithImage
        );
        if (res.status === 200) setOpen(true);
        setTimeout(() => {
          setIsEditMode(!isEditMode);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }

    redirectTimeout = setTimeout(() => {
      history.push(
        buildPath(routes.restaurantDetails, { id: restaurantCreatedId })
      );
    }, 3000);
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    handleAddOrEditRestaurant,
    restaurant
  );

  return (
    <>
      <AlertSuccsess>
        {isEditMode ? (
          <>{inputs.name} was updated successfully</>
        ) : (
          <>{inputs.name} was created successfully</>
        )}
      </AlertSuccsess>
      <AlertFail />

      <HeroSection>
        <Typography variant="h3" className="m-30">
          {isEditMode ? (
            <p>Edit Restaurant - {restaurant.name}</p>
          ) : (
            "Add Restaurant"
          )}
        </Typography>
      </HeroSection>

      <form onSubmit={handleSubmit}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              {isEditMode ? <EditIcon /> : <AddLocationIcon />}
            </Avatar>
            <Typography className="mtb-20" component="h1" variant="h5">
              {isEditMode ? (
                <p>Edit Restaurant - {restaurant.name}</p>
              ) : (
                "Add Restaurant"
              )}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  autoFocus
                  onChange={handleInputChange}
                  label="Name"
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
                  label="Price (1-5)"
                  name="price_range"
                  onChange={handleInputChange}
                  helperText="Based on your experience"
                >
                  {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  onChange={handleInputChange}
                  name="location"
                  value={inputs?.location || ""}
                  required
                  label="Location"
                />
              </Grid>
              <Grid item xs={12} md={12} container justify="center">
                <KeyboardTimePicker
                  margin="normal"
                  required
                  label="Opening time"
                  name="opening_time"
                  className="open-timepicker"
                  value={openingTime}
                  onChange={(data) => setOpeningTime(data)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  required
                  name="closing_time"
                  label="Closing time"
                  value={closingTime}
                  onChange={(data) => setClosingTime(data)}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/jpeg"
                  className={classes.input}
                  style={{ display: "none" }}
                  id="faceImage"
                  type="file"
                  name="restaurantImage"
                  onChange={handleCapture}
                />
                <Tooltip title="Select Image">
                  <label htmlFor="faceImage">
                    <IconButton
                      className={classes.faceImage}
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera fontSize="large" />
                    </IconButton>
                  </label>
                </Tooltip>
                <label>
                  {selectedFile ? selectedFile.name : "Select Image"}
                  {imageSource && (
                    <img
                      src={imageSource}
                      alt="ds"
                      style={{ height: "40px" }}
                    />
                  )}
                </label>
              </Grid>
            </Grid>
            <Grid container justify="space-around">
              <Grid item>
                {isEditMode && (
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={() => setIsEditMode(!isEditMode)}
                  >
                    back
                  </Button>
                )}
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  submit
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </form>
    </>
  );
};

export default AddRestaurants;
