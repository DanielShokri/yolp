import { useEffect } from "react";
import HeroSection from "./../components/HeroSection";
import { Typography } from "@material-ui/core";
import RestaurantsList from "./../components/RestaurantsList";
import { useSelector, useDispatch } from "react-redux";
import { getRestaurantsByQuery } from "./../features/restaurants/restaurantsSlice";

const SearchResults = ({ history }) => {
  const { query, restaurants } = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!query) {
      history.push("/");
    }
    dispatch(getRestaurantsByQuery(query));
  }, [query]);

  return (
    <div>
      <HeroSection>
        <Typography
          className="mtb-20"
          variant="h1"
          style={{ fontWeight: "700" }}
        >
          SEARCH RESULTS FOR: <br /> {query?.query}
        </Typography>
      </HeroSection>
      {Object.keys(restaurants).length !== 0 ? (
        <RestaurantsList restaurantsList={restaurants} isSearchList />
      ) : (
        <>
          <Typography
            className="mtb-20"
            variant="h4"
            style={{ fontWeight: "700" }}
          >
            No results for: {query?.query}
          </Typography>
          <img src="/images/cantfind.png" width="150" alt="logo" />
        </>
      )}
    </div>
  );
};

export default SearchResults;
