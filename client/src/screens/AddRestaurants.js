import {useContext, useEffect, useState} from "react";
import {Avatar, Button, Container, CssBaseline, Grid, MenuItem, TextField, Typography,} from "@mui/material";
import TimePicker from "@mui/lab/TimePicker";
import useForm from "../utils/useForm";
import {AlertFail, AlertSuccess} from "./../components/Alert";
import {AlertContext} from "./../context/AlertContext";
import {options, useStylesForm} from "./../utils/constants";
import HeroSection from "../components/HeroSection";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import EditIcon from "@mui/icons-material/Edit";
import {buildPath, routes} from "./../utils/routes";
import {useHistory} from "react-router";
import "../styles/AddRestaurant.css";
import {useDispatch, useSelector} from "react-redux";
import {handleAddRestaurant, handleEditRestaurant, setRestaurants,} from "../features/restaurants/restaurantsSlice";
import {useFetchRestaurantsQuery} from "../features/api/restaurantsApiSlice";

const AddRestaurants = (props) => {
  const { restaurantEdit, isEditMode } = props;
  const classes = useStylesForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const { setOpen, setOpenError } = useContext(AlertContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSource, setImageSource] = useState("");
  const [openingTime, setOpeningTime] = useState(restaurantEdit?.opening_time);
  const [closingTime, setClosingTime] = useState(restaurantEdit?.closing_time);
  const { restaurant } = useSelector((state) => state.restaurants);
  const { data, isSuccess } = useFetchRestaurantsQuery();
  let redirectTimeout;

  useEffect(() => {
    if (isSuccess) {
      dispatch(setRestaurants(data.data.restaurants));
    }
  }, [data, isSuccess]);

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
  }, [redirectTimeout]);

  const handleAddOrEditRestaurant = async () => {
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
        dispatch(handleAddRestaurant(inputsWithImage)).then((data) => {
          setOpen(true);
          redirectTimeout = setTimeout(() => {
            history.push(
              buildPath(routes.restaurantDetails, {
                id: Object.keys(restaurant).length !== 0 && restaurant?.id,
              })
            );
          }, 2000);
        });
      } catch (error) {
        setOpenError(true);
        console.log(error);
      }
    } else {
      try {
        dispatch(
          handleEditRestaurant({
            inputsWithImage,
            restaurantId: restaurantEdit.id,
          })
        ).then(() => {
          setOpen(true);
          redirectTimeout = setTimeout(() => {
            history.push(
              buildPath(routes.restaurantDetails, {
                id: restaurantEdit.id,
              })
            );
          }, 2000);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    handleAddOrEditRestaurant,
    restaurantEdit
  );

  return (
    <>
      <AlertSuccess>
        {isEditMode ? (
          <>{inputs.name} was updated successfully</>
        ) : (
          <>{inputs.name} was created successfully</>
        )}
      </AlertSuccess>
      <AlertFail />

      <HeroSection>
        <Typography variant="h3" className="m-30">
          {isEditMode ? (
            <p>Edit Restaurant - {restaurantEdit.name}</p>
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
                <p>Edit Restaurant - {restaurantEdit.name}</p>
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
                  value={inputs?.price_range || 1}
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
              <Grid
                item
                xs={12}
                md={12}
                container
                justifyContent="space-between"
              >
                <TimePicker
                  margin="normal"
                  renderInput={(props) => <TextField {...props} />}
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
                <TimePicker
                  margin="normal"
                  renderInput={(props) => <TextField {...props} />}
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
                {/* <Tooltip title="Select Image">
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
                </label> */}
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item>
                {isEditMode && (
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={() => {
                      history.push(
                        buildPath(routes.restaurantDetails, {
                          id: restaurantEdit.id,
                        })
                      );
                    }}
                  >
                    back
                  </Button>
                )}
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  fullWidth
                  size="large"
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
