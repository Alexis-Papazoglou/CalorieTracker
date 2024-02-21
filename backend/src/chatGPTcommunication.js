const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI();

async function imageCaloriesRequest({ description, imageUrl }) {
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

    {"general_title": "Fried Chicken and Potatoes","food_items": [{"food": "chicken", "weight": 200, "calories": 400, "fat": 20, "protein": 80 },{"food": "potatoes", "weight": 150, "calories": 200, "fat": 5, "protein": 10 }]}

    Note: It's crucial to ensure that the response adheres precisely to the specified format, data types, and requirements in all scenarios. This level of precision minimizes error potential, enhances user satisfaction, and maintains the credibility and reliability of the service.

    Super important note: The response must be a valid string representing a JSON object in all cases in plain text without any highlight or special characters!
    The only acceptable response is a string representing a JSON object in plain text without any highlight or special characters and only , if you cant answer then return {"food": "no items"}.
`

    if (description !== '') {
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
        max_tokens: 1500 
    });

    return (response.choices[0].message.content);
}

async function calculateDailyCalories({ weight, height, age, trainingActivity, gender, goal , bodyType , timeGoal}) {
    let prompt = `
    Task: Calculate the daily calorie intake for a human based on the following parameters:
    - Weight: ${weight} kg
    - Height: ${height} cm
    - Age: ${age} years
    - Training Activity: ${trainingActivity}
    - Gender: ${gender}
    - Goal: ${goal}
    - Body Type: ${bodyType}
    - Time i want to reach my goal: ${timeGoal}
    `;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content: `You are an expert nutrition assistant dedicated to providing accurate daily calorie intake calculations based on individual parameters. Your goal is to ensure consistency and accuracy in your responses. Your final answer should be a single integer representing the daily calorie intake for the provided values and nothing more. Please keep all calculations internal and provide only the final answer in the response. 

                For consistent and accurate calculations, adhere to the following formulae:
                - For women: BMR = 655 + (9.6 × weight in kg) + (1.8 × height in cm) - (4.7 × age in years)
                - For men: BMR = 66 + (13.7 × weight in kg) + (5 × height in cm) - (6.8 × age in years)
                
                After computing the Basal Metabolic Rate (BMR), multiply it by the appropriate activity factor to determine the daily calorie intake. The activity factor varies based on activity level: 1.2 for sedentary, 1.375 for light activity, 1.55 for moderate activity, 1.725 for very active, and 1.9 for extra active individuals.
                
                Your task is to calculate the daily calorie intake using the provided parameters. Provide the most accurate information possible for optimal results. Always return the final answer as a single integer and nothing more. Example answer: 1500. Ensure that your response is consistent with the provided parameters and adheres to the specified formulae.`

            },
            {
                role: "user",
                content: prompt,
            },
        ],
        max_tokens: 100
    });

    // Parse the response to get the calorie intake
    const calorieIntake = parseInt(response.choices[0].message.content.trim());
    return calorieIntake;
}


module.exports = { imageCaloriesRequest, calculateDailyCalories };
