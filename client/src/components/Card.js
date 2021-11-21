import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {useHistory} from "react-router";
import {buildPath, routes} from "./../utils/routes";
import {useDispatch, useSelector} from "react-redux";
import {setRestaurant} from "../features/restaurants/restaurantsSlice";
import "../styles/Card.css";
import {CustomizedTooltip} from "./Tooltip";

const Card = ({restaurant, handleDelete}) => {
    let history = useHistory();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.users);

    const deleteRestaurant = () => {
        const restToDelete = {
            id: restaurant.id,
            name: restaurant.name,
        };
        handleDelete(restToDelete);
    };

    const isFavouriteRestaurant = () => {
        return user && user.favorites && user.favorites.some((fav) => fav.restaurant_id === restaurant.id)
    }
    return (
        <div className="card-container">
            <div className="card">
                <div className="card-header">
                    <a className='card-link' href="#">
                        <img
                            src="https://res.cloudinary.com/daily-now/image/upload/t_logo,f_auto/v1/logos/64c390aa97214456be47cd91d5002a56"
                            alt=""/>
                    </a>
                    <h3> {restaurant.name.replace(/\w/, (c) => c.toUpperCase())}</h3>
                </div>
                <div className='card-photo'>
                    <img
                        src={restaurant.restaurant_image ? restaurant.restaurant_image : "/images/placeholder-image.png"}
                        alt=""/>
                </div>
                <div className="action-menu">
                    <CustomizedTooltip title='Go to restaurant profile'>
                        <div className='icons-actions' onClick={() => {
                            dispatch(setRestaurant(restaurant));
                            history.push(
                                buildPath(routes.restaurantDetails, {id: restaurant.id}))
                        }}>
                            <ArrowForwardIosIcon/>
                        </div>
                    </CustomizedTooltip>
                    <CustomizedTooltip title='Delete Restaurant'>
                        <div className='icons-actions' onClick={deleteRestaurant}><DeleteIcon/></div>
                    </CustomizedTooltip>
                    <CustomizedTooltip title={isFavouriteRestaurant() ? 'Remove from favourites' : 'Add to favourites'}>
                        <div className='icons-actions'>{isFavouriteRestaurant() ? <BookmarkIcon/> :
                            <BookmarkBorderIcon/>}</div>
                    </CustomizedTooltip>
                </div>
            </div>
        </div>

    )

};

export default Card;
