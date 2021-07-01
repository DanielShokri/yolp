import { useContext, useEffect } from "react";
import { Button } from "@material-ui/core";
import useLocalStorage from "./../utils/useLocalStorage";
import { usersContext } from "./../context/userContext";
import { routes } from "./../utils/routes";

const UserProfile = (props) => {
  const { history, match } = props;

  const { setIsAuthenticated, isAuthenticated, user, setUser } =
    useContext(usersContext);

  useEffect(() => {
    if (isAuthenticated && match.params?.id === user?.id) {
      return;
    } else {
      history.push(routes.homePage);
    }
  }, []);

  const handleLogout = () => {
    setUser({});
    setIsAuthenticated(false);
    history.push(routes.homePage);
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
export default UserProfile;
