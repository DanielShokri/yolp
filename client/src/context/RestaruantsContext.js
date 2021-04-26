import { React, useState, createContext } from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <RestaurantsContext.Provider
      value={{ restaurants, setRestaurants, query, setQuery }}
    >
      {props.children}
    </RestaurantsContext.Provider>
  );
};
