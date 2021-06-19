function isDuplicateFavorite(fav_list, restaurant) {
  if (!fav_list) return false;
  return fav_list.includes(restaurant);
}

module.exports = {
  isDuplicateFavorite,
};
