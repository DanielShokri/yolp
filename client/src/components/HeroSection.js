import { useContext } from "react";
import { RestaurantsContext } from "./../context/RestaruantsContext";
import "../styles/HeroSection.css";

const HeroSection = ({ children, height }) => {
  const { restaurant } = useContext(RestaurantsContext);

  return (
    <div
      className="hero"
      style={{
        height: `${height ? height : "240"}px`,
        backgroundImage: `url(${
          restaurant.restaurant_image
            ? restaurant.restaurant_image
            : "https://source.unsplash.com/1600x900/?dish"
        })`,
      }}
    >
      <div className="overlay"></div>
      <div className="content">{children}</div>
    </div>
  );
};

export default HeroSection;
