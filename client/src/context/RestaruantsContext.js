import { React, useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurant, setRestaurant] = useState({});
  const [query, setQuery] = useState("");

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        restaurant,
        setRestaurant,
        query,
        setQuery,
      }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
