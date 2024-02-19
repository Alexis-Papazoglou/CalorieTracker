const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI();

async function imageCaloriesRequest({description, imageUrl}) {
    let prompt = `
    Task: The task is to analyze an image to identify food and drink items. For each identified item, provide its name, calorie count, fat content , protein content, and weight. Additionally, include a general title for the entire selection of food items.

    Response Format: The response format should be a string representing a JSON and adhere strictly to the following structure:

    If no food items are found in the image, the response should be: {"food": "no items"}.
    If food items are identified, the response should include:
    A general title for the entire selection of food items (optional).
    An array of food items, each represented as a JSON object with the following keys:
    "food": The name of the food item. This field must be a non-empty string.
    "weight": The weight of the food item (in grams), represented as a positive integer.
    "calories": The calorie count of the food item, represented as a positive integer.
    "fat": The fat content of the food item (in grams), represented as a positive integer.
    "protein": The protein content of the food item (in grams), represented as a positive integer.
    Additional Requirements:

    The weight, calorie count, protein content and fat content should always be integers.
    Ensure that the calorie count , protein content and fat content are proportional to the weight.
    If the image analysis is uncertain or ambiguous regarding a specific item, make assumptions based on average values for the fields.
    If the image analysis cannot confidently identify any food items, return the "food": "no items" response.
    The response must be a valid string representing a JSON object in all cases, adhering strictly to the specified structure and data types.
    The total calorie count, protein content and fat content for all identified food items should be accurate, calculated based on the individual weights, calorie counts, protein contents and fat contents.
    Avoid common errors such as misspellings, missing or incorrect data fields, or invalid JSON syntax.
    Example Response:

    {"general_title": "Fried Chicken and Potatoes","food_items": [{"food": "chicken", "weight": 200, "calories": 400, "fat": 20, "protein": 80},{"food": "potatoes", "weight": 150, "calories": 200, "fat": 5, "protein": 10}]}

    Note: It's crucial to ensure that the response adheres precisely to the specified format, data types, and requirements in all scenarios. This level of precision minimizes error potential, enhances user satisfaction, and maintains the credibility and reliability of the service.

    Super important note: The response must be a valid string representing a JSON object in all cases in plain text without any highlight or special characters!
    The only acceptable response is a string representing a JSON object in plain text without any highlight or special characters and only , if you cant answer then return {"food": "no items"}.
`

    if(description !== ''){
        console.log('description:', description)
        prompt += `Additionally, if you need further clarification, 
        consider the description provided but rely on the image for accuracy. Description: ${description}`;
    }

    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: prompt },
                    {
                        type: "image_url",
                        image_url: {
                            "url": imageUrl,
                            "detail": "low"
                        },
                    },
                ],
            },
        ],
        max_tokens: 1000 // Increase this value to get a longer response
    });

    return (response.choices[0].message.content);
}

module.exports = imageCaloriesRequest;



// const promp = `
// Task: The task is to analyze an image to identify food and drink items. For each identified item, provide its name, calorie count, fat content, and weight. Additionally, include a general title for the entire selection of food items.

// Response Format: The response format should be in JSON and adhere strictly to the following structure:

// If no food items are found in the image, the response should be: {"food": "no items"}.
// If food items are identified, the response should include:
// A general title for the entire selection of food items.
// An array of food items, each represented as a JSON object with the following keys:
// "food": The name of the food item. This field must be a non-empty string.
// "weight": The weight of the food item (in grams), represented as a positive integer.
// "calories": The calorie count of the food item, represented as a positive integer.
// "fat": The fat content of the food item (in grams), represented as a positive integer.
// Additional Requirements:

// The weight, calorie count, and fat content should always be integers.
// Ensure that the calorie count and fat content are proportional to the weight.
// If the image analysis is uncertain or ambiguous regarding a specific item, make assumptions based on average values for the fields.
// If the image analysis cannot confidently identify any food items, return the "food": "no items" response.
// The response must be a valid JSON object in all cases, adhering strictly to the specified structure and data types.
// The total calorie count and fat content for all identified food items should be accurate, calculated based on the individual weights, calorie counts, and fat contents.
// Avoid common errors such as misspellings, missing or incorrect data fields, or invalid JSON syntax.
// Example Response:

// {
//   "general_title": "Fried Chicken and Potatoes",
//   "food_items": [
//     {"food": "chicken", "weight": 200, "calories": 400, "fat": 20},
//     {"food": "potatoes", "weight": 150, "calories": 200, "fat": 5}
//   ]
// }

// Note: It's crucial to ensure that the response adheres precisely to the specified format, data types, and requirements in all scenarios. This level of precision minimizes error potential, enhances user satisfaction, and maintains the credibility and reliability of the service.

// `