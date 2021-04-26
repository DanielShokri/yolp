import "../styles/MenuCard.css";

const MenuCard = () => {
  return (
    <div className="dish-wrapper">
      <div className="dish-photo">
        <div
          className="dish-photo-background"
          style={{
            backgroundImage:
              'url("https://s3-media0.fl.yelpcdn.com/bphoto/YXnHL37lAxPH_9TMCwWXfA/258s.jpg")',
          }}
        >
          <span className="dish-price">$16.50</span>
        </div>
      </div>
      <div className="no-warp">
        <div className="dish-name">Shawrma</div>
        <span className="dish-details">1 Photo &nbsp;</span>
        <span className="dish-detail dish-details"> &nbsp; 2 Reviwes</span>
      </div>
    </div>
  );
};

export default MenuCard;
