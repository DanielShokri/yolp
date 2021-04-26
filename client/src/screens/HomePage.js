import { useEffect, useContext } from "react";
import HeroSection from "../components/HeroSection";
import { Divider } from "@material-ui/core";
import RestaurantsList from "../components/RestaurantsList";
import restaruantApi from "../api/restaruantsApi";
import { RestaurantsContext } from "./../context/RestaruantsContext";
import Search from "./../components/Search";

const HomePage = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await restaruantApi.get("/");
        setRestaurants(res.data.data.restaurants);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [setRestaurants]);

  return (
    <div>
      <HeroSection>
        <img src="/images/logo.png" alt="logo" />
        <Search />
      </HeroSection>
      <Divider />
      <RestaurantsList restaurantsList={restaurants} />
    </div>
  );
};

export default HomePage;
