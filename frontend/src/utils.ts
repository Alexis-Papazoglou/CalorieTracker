export function getDate(desiredDay: string) {
  let date;
  if (desiredDay === "today") {
    date = new Date();
  } else if (desiredDay === "yesterday") {
    date = new Date();
    date.setDate(date.getDate() - 1);
  } else {
    throw new Error("Invalid argument. Expected 'today' or 'yesterday'.");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const dateString = `${year}-${month}-${day}`;
  return dateString;
}

export function formatDate(d: number | undefined) {
  const date = new Date(Number(d)); // Ensure meal.date is treated as a number
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${hours}:${minutes} - ${day}/${month} `;

  return formattedDate;
}
