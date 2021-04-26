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
import restaruantsApi from "../api/restaruantsApi";
import useForm from "../utils/useForm";
import { useContext } from "react";
import { AlertFail, AlertSuccsess } from "./../components/Alert";
import { AlertContext } from "./../context/AlertContext";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import { options, useStylesForm } from "./../utils/constants";
import HeroSection from "../components/HeroSection";
import "../styles/AddRestaurant.css";

const AddRestaurants = ({ restaurant, isEditMode, setIsEditMode }) => {
  const classes = useStylesForm();
  const { setOpen, setOpenError } = useContext(AlertContext);

  const handleAddOrEditRestaurant = async () => {
    if (!isEditMode) {
      try {
        const res = await restaruantsApi.post("/", inputs);
        if (res.status === 200) setOpen(true);
      } catch (error) {
        setOpenError(true);
        console.log(error);
      }
    } else {
      try {
        const res = await restaruantsApi.put(`/${restaurant.id}`, inputs);
        if (res.status === 200) setOpen(true);
        setTimeout(() => {
          setIsEditMode(!isEditMode);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
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
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <AddLocationIcon />
            </Avatar>
            <Typography className="mtb-20" component="h1" variant="h5">
              Add new restaurant
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

      {/* <form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        className={classes.root}
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-basic"
          onChange={handleInputChange}
          label="Name"
          name="name"
          required
          value={inputs?.name || ""}
        />

        <TextField
          name="location"
          value={inputs?.location || ""}
          required
          label="Location"
          onChange={handleInputChange}
          id="standard-basic"
        />

        <TextField
          required
          value={inputs?.price_range || 1}
          id="standard-select-currency"
          select
          label="Price (1-5)"
          name="price_range"
          onChange={handleInputChange}
          helperText="Please select your opinion"
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          submit
        </Button>
      </form> */}
    </>
  );
};

export default AddRestaurants;
