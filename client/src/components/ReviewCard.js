import { format } from "date-fns";
import StarRating from "./StarRating";
import "../styles/ReviewCard.css";

const ReviewCard = ({ review }) => {
  return (
    <>
      {Object.keys(review).length !== 0 && (
        <div className="review-card">
          <div className="review-header">
            <div className="name-group">
              <p>{review.name}</p>
            </div>
            <div className="rating">
              <StarRating
                disable={true}
                review={review.rating}
                disableBox={true}
              />
            </div>
          </div>
          <div className="review-description">{review.review}</div>
          <div className="review-details">
            <div className="review-date">
              {format(new Date(review.posting_date), "PPPP")}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewCard;
