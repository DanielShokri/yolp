import { React, useState, createContext } from "react";
import useLocalStorage from "./../utils/useLocalStorage";

export const usersContext = createContext();

export const UsersContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useLocalStorage("user");
  const [userDetails, setUserDetails] = useLocalStorage("user_details");

  return (
    <usersContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        userDetails,
        setUserDetails,
      }}
    >
      {props.children}
    </usersContext.Provider>
  );
};
