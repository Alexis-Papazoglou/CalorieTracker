function createJSONfromChatResponse(foodData) {
    // Parse the string response to a JavaScript object
    let responseData;

    try {
        responseData = JSON.parse(foodData);
    } catch (error) {
        return { error: "Invalid JSON response" };
    }
    
    // If the response indicates no items, return immediately
    if (responseData.food === "no items") {
        return responseData;
    }

    // Extract general title and food items
    const generalTitle = responseData.general_title || "";
    const foodItems = responseData.food_items || [];

    // Construct an array of JSON objects for food items
    const foodArray = foodItems.map(item => {
        return {
            food: item.food,
            weight: parseInt(item.weight),
            calories: parseInt(item.calories),
            fat: parseInt(item.fat),
            protein: parseInt(item.protein),
        };
    });

    // Construct the final JSON object
    const finalJSON = {
        general_title: generalTitle,
        food_items: foodArray
    };

    return finalJSON;
}

module.exports = createJSONfromChatResponse;
