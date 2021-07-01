function isDuplicateFavorite(fav_list, restaurantId) {
  if (!fav_list.length) return false;
  return fav_list.some((fav) => fav.restaurant_id === restaurantId);
}

module.exports = {
  isDuplicateFavorite,
};
