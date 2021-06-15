import pathToRegexp from "path-to-regexp";

export const routes = {
  homePage: "/",
  login: "/login",
  register: "/register",
  userProfile: "/profile/:id",
  restaurantDetails: "/restaurant/:id",
  addRestaurant: "/restaurants/add",
  addReview: "/restaruant/:id/review",
  searchResults: "/restaurants/searchresults",
};

export const buildPath = (route, params) => {
  const toPath = pathToRegexp.compile(route);
  return toPath(params);
};
