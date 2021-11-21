import {useEffect} from "react";
import {Button} from "@mui/material";
import {routes} from "./../utils/routes";
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from "../features/users/usersSlice";

const UserProfile = (props) => {
  const { history, match } = props;
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.users);

  useEffect(() => {
    if (isAuthenticated && match.params?.id === user?.id) {
      return;
    } else {
      history.push(routes.homePage);
    }
  }, []);

  const handleLogout = () => {
    dispatch(userLogout());
    history.push(routes.homePage);
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
export default UserProfile;
