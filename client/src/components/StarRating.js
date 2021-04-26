import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { useState } from "react";

const labels = {
  1: "Not good",
  2: "Could’ve been better",
  3: "Ok",
  4: "Good",
  5: "Excellent",
};

const StarRating = ({ review, disable, disableBox }) => {
  const [value, setValue] = useState(+review || 2);
  const [hover, setHover] = useState(-1);

  return (
    <div>
      <Rating
        name="hover-feedback"
        value={value}
        disabled={disable}
        precision={1}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      {value !== null && !disableBox && (
        <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </div>
  );
};

export default StarRating;
