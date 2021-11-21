import {useEffect} from "react";
import HeroSection from "../components/HeroSection";
import RestaurantsList from "../components/RestaurantsList";
import Search from "./../components/Search";
import {useDispatch, useSelector} from "react-redux";
import {setRestaurants} from "../features/restaurants/restaurantsSlice";
import {useFetchRestaurantsQuery} from "../features/api/restaurantsApiSlice";
import {Divider} from "@mui/material";

const HomePage = () => {
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state) => state.restaurants);
  const { data, isFetching, isSuccess, refetch } = useFetchRestaurantsQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setRestaurants(data.data.restaurants));
    }
    refetch();
  }, [data, isSuccess]);

  return (
    <div>
      <HeroSection height="400">
        <img src="/images/logo.png" alt="logo" />
        <Search />
      </HeroSection>
      <Divider />
      {isFetching ? (
        <div style={{ position: "relative" }}>
          <div className="spinner"></div>
        </div>
      ) : (
        <RestaurantsList restaurantsList={restaurants} />
      )}
    </div>
  );
};

export default HomePage;
