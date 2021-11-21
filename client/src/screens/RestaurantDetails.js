import {useContext, useEffect, useMemo, useState} from "react";
import {Button, Chip, Divider, Grid, Typography} from "@mui/material";
import HeroSection from "../components/HeroSection";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MenuCard from "../components/MenuCard";
import StarRating from "../components/StarRating";
import ReviewCard from "../components/ReviewCard";
import {buildPath, routes} from "./../utils/routes";
import {useHistory} from "react-router";
import {format} from "date-fns";
import {he} from "date-fns/locale";
import {AlertContext} from "./../context/AlertContext";
import {AlertFail} from "../components/Alert";
import {AlertSuccess} from "./../components/Alert";
import {useDispatch, useSelector} from "react-redux";
import {setRestaurant} from "../features/restaurants/restaurantsSlice";
import {useFetchRestaurantQuery} from "../features/api/restaurantsApiSlice";
import {handleSaveToFavorite} from "../features/users/usersSlice";
import {handleRemoveFromFavorite} from "./../features/users/usersSlice";
import "../styles/RestaurantDetails.css";
import {priceRangeText} from "./../utils/constants";
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore'
import {capitalize} from "../utils/utils";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const RestaurantDetails = (props) => {
    let history = useHistory();
    const {match} = props;
    const restaurantId = match.params.id;
    const {setOpenError, setOpen} = useContext(AlertContext);

    // Request the selected restaurant details
    const dispatch = useDispatch();
    const {restaurant} = useSelector((state) => state.restaurants);
    const {user, isAuthenticated} = useSelector((state) => state.users);
    const {data, isFetching, isSuccess} = useFetchRestaurantQuery(
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
            const openingTime = isAfter(new Date(), new Date(restaurant.opening_time))
            const closingTime = isBefore(new Date(), new Date(restaurant.closing_time))
            if (openingTime && closingTime) {
                setIsOpen(true)
            } else setIsOpen(false)
        }
    }, [restaurant]);

    const renderFavoriteButton = useMemo(() => {
        return user && Object.keys(user).length !== 0 &&
        user.favorites &&
        Object.keys(user?.favorites).length !== 0 &&
        user?.favorites.some(
            (fav) => fav && fav.restaurant_id === restaurantId
        ) ? (
            <Button
                className="review-button"
                variant="outlined"
                // color="default"
                size="large"
                startIcon={<BookmarkBorderIcon fontSize="large"/>}
                onClick={() => handleSaveOrDeleteFavorite(true)}
            >
                remove from favorites
            </Button>
        ) : (
            <Button
                className="review-button"
                variant="outlined"
                // color="default"
                size="large"
                startIcon={<BookmarkBorderIcon fontSize="large"/>}
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
                            style={{fontWeight: "700"}}
                        >
                            {capitalize(restaurant.name)}
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
                                variant="outlined"
                                icon={isOpen ? <LockOpenOutlinedIcon/> : <LockOutlinedIcon/>}
                                color={isOpen ? "info" : "error"}
                                label={isOpen ? "Open" : "Close"}
                            />
                            <span style={{fontWeight: "700"}}>
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
                            icon={<MonetizationOnIcon/>}
                            color="default"
                            label={priceRangeText[restaurant.price_range]}
                        />
                    </div>
                </HeroSection>

                <div className="biz-details-page-container">
                    <Grid container align="left">
                        <div className="button-container">
                            <Button
                                variant="contained"
                                color="success"
                                size="large"
                                className="review-button"
                                startIcon={<StarBorderIcon fontSize="large"/>}
                                onClick={() =>
                                    history.push(
                                        buildPath(routes.addReview, {id: restaurantId && restaurantId})
                                    )
                                }
                            >
                                Write a Review
                            </Button>

                            {Object.keys(user).length !== 0 ? (
                                renderFavoriteButton
                            ) : (
                                <Button
                                    className="review-button"
                                    variant="outlined"
                                    // color="default"
                                    size="large"
                                    startIcon={<BookmarkBorderIcon fontSize="large"/>}
                                    onClick={() => handleSaveOrDeleteFavorite(false)}
                                >
                                    add to favorites
                                </Button>
                            )}

                            <Button
                                className="review-button"
                                variant="outlined"
                                size="large"
                                color="secondary"
                                startIcon={<EditOutlinedIcon fontSize="large"/>}
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
                    <Divider/>
                    <Grid container alignContent="flex-end">
                        <Typography className="button-container" variant="h4" align="left">
                            Menu
                        </Typography>
                    </Grid>
                    <Grid className="menu-container" container alignContent="center">
                        <MenuCard/>
                        <MenuCard/>
                    </Grid>
                    <Divider/>
                    <Grid container alignContent="flex-end">
                        <Typography className="button-container" variant="h4" align="left">
                            Reviews
                        </Typography>
                    </Grid>
                    <Grid container alignContent="center">
                        {Object.keys(restaurantReviews).length !== 0 ? (
                            restaurantReviews.slice(0, showMoreCount).map((review) => (
                                <div key={review.review} style={{margin: "0 10px"}}>
                                    <ReviewCard review={review}/>
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
                            style={{margin: "40px 0"}}
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
