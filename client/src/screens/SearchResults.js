import { useEffect, useContext, useState } from "react";
import restaruantsApi from "../api/restaruantsApi";
import { RestaurantsContext } from "./../context/RestaruantsContext";
import HeroSection from "./../components/HeroSection";
import { Typography } from "@material-ui/core";
import RestaurantsList from "./../components/RestaurantsList";
import { routes } from "./../utils/routes";

const SearchResults = ({ history }) => {
  const { query } = useContext(RestaurantsContext);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (!query.query) history.push(routes.homePage);
      try {
        const { data } = await restaruantsApi.post(`/search`, query);
        setResults(data.data.restaurants);
      } catch (error) {
        console.log(error);
      }
    };
    handleSearch();
  }, [query, history]);

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
      {Object.keys(results).length !== 0 ? (
        <RestaurantsList restaurantsList={results} isSerachList />
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
