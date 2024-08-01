export const formatYYYYMMDD = (e) => {
  const date = new Date(e);
  const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD format
  return formattedDate;
};

export const formatMMMMDDYYYY = (e) => {
  const date = new Date(e);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }); // MMMM DD, YYYY format
  return formattedDate;
};
