export function getDate(desiredDay) {
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