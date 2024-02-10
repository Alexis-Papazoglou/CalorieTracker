function createJSONfromChatResponse(foodData) {
    // Replace single quotes with double quotes and add quotes around keys
    const formattedFoodData = foodData.replace(/(\w+):/g, '"$1":').replace(/'/g, '"');

    // Wrap the string in square brackets to make it a valid JSON array string
    const jsonArrayString = `[${formattedFoodData}]`;

    // Use JSON.parse() to convert the string to a JavaScript object
    const foodArray = JSON.parse(jsonArrayString);

    return foodArray;
}

module.exports = createJSONfromChatResponse;