const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI();

async function imageCaloriesRequest({description, imageUrl}) {
    let prompt = `Please analyze the image and identify each item that qualifies as food or drink.
     For each identified item, provide its name, calorie count, and weight. Your response format should be in JSON as follows
     : {"food": "foodname", "weight": weight, "calories": calories } and nothing else ever if something is not clear for you you should
     provide again this json object with assumptions about the fields with the assumptions coming  from average values.
     Ensure that the weight and calories are integers, and the calories are proportional to the weight. 
     For instance, if the item typically contains 200 calories per 100 grams and its weight in the image is 200 grams,
     the calories should be 400. If there are multiple food items, separate them with commas.You always need to provide some json objects
     as a response and the format should always be {"food": "foodname", "weight": weight, "calories": calories } for more than one item
     seperate them with commas and remember to give as response a valid json object no matter what. The format is super important!
     If no items are found, return {"food": "no items"}. Either case you should only provide the json object or the {"food": "no items"} response and nothing else ever!`;

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
        max_tokens: 50 // Increase this value to get a longer response
    });

    return (response.choices[0].message.content);
}

module.exports = imageCaloriesRequest;