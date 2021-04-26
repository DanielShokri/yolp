import { useContext } from "react";
import {
  FormControl,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
  InputLabel,
} from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import useForm from "./../utils/useForm";
import { RestaurantsContext } from "./../context/RestaruantsContext";
import { routes } from "./../utils/routes";
import { useHistory } from "react-router";

const Search = () => {
  const { setQuery } = useContext(RestaurantsContext);
  const history = useHistory();

  const handleSearch = () => {
    if (Object.keys(inputs).length !== 0) {
      setQuery(inputs);
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
          Search for good restaurants in your area.
        </FormHelperText>
      </FormControl>
    </form>
  );
};

export default Search;
