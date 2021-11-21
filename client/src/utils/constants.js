import {makeStyles} from "@mui/styles";

export const priceRangeText = {
  1: "Very Cheap",
  2: "Cheap",
  3: "Moderate",
  4: "Expensive",
  5: "Very Expensive",
};

// Express server on port 3002

export const options = [
  {
    value: 1,
    label: "$",
  },
  {
    value: 2,
    label: "$$",
  },
  {
    value: 3,
    label: "$$$",
  },
  {
    value: 4,
    label: "$$$$",
  },
  {
    value: 5,
    label: "$$$$$",
  },
];

export const reviewOptions = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

export const useStylesForm = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
