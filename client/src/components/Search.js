import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput,} from "@mui/material";
import {SearchOutlined} from "@mui/icons-material";
import useForm from "./../utils/useForm";
import {routes} from "./../utils/routes";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {setSearchQuery} from "../features/restaurants/restaurantsSlice";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSearch = () => {
    if (Object.keys(inputs).length !== 0) {
      dispatch(setSearchQuery(inputs));
      history.push(routes.searchResults);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(handleSearch);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth variant="outlined">
        <InputLabel className="search-label">Search...</InputLabel>
        <OutlinedInput
          className="input-box-shadow"
          style={{ color: "white" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={handleSubmit}
                aria-label="toggle password visibility"
                edge="end"
              >
                {<SearchOutlined style={{ color: "white" }} />}
              </IconButton>
            </InputAdornment>
          }
          name="query"
          onChange={handleInputChange}
          label="Search..."
          variant="filled"
        />
        <FormHelperText style={{ color: "white" }} id="my-helper-text">
          Search for good restaurants.
        </FormHelperText>
      </FormControl>
    </form>
  );
};

export default Search;
