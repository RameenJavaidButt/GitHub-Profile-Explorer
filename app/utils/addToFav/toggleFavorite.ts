export function toggleFavorite(id: number, favorites: number[]): number[] {
  const updated = favorites.includes(id)
    ? favorites.filter((fav) => fav !== id)
    : [...favorites, id];
  localStorage.setItem("favorites", JSON.stringify(updated));
  return updated;
}
