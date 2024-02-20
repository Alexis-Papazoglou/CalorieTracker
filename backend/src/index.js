const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { imageCaloriesRequest, calculateDailyCalories } = require('./chatGPTcommunication');
const createJSONfromChatResponse = require('./utils');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('Server is running')
    res.json({ message: 'Server is running' });
});

// POST /analyze endpoint
app.post('/analyze', async (req, res) => {
    const { imageUrl, description } = req.body;

    if (!imageUrl) {
        return res.status(400).json({ error: 'imageUrl is required' });
    }

    async function getAndSendChatResponse() {
        const chatResponse = await imageCaloriesRequest({ description, imageUrl });
        if (chatResponse !== null) {
            console.log('chatResponse:', chatResponse, 'end');
            const foodArray = createJSONfromChatResponse(chatResponse);
            console.log(foodArray);
            res.json(foodArray);
        } else {
            console.error('chatResponse is null');
        }
    }
    getAndSendChatResponse();
});

app.post('/calculateDailyCalories', async (req, res) => {
    const { weight, height, age, trainingActivity, gender, goal, bodyType, timeGoal } = req.body;

    let promises = [];
    for (let i = 0; i < 10; i++) {
        promises.push(calculateDailyCalories({ weight, height, age, trainingActivity, gender, goal, bodyType, timeGoal }));
    }

    let results = await Promise.all(promises);
    console.log(results);

    results.sort((a, b) => a - b);
    let trimAmount = Math.round(results.length * 0.1); // 20% trim
    let trimmedResults = results.slice(trimAmount, results.length - trimAmount);
    let trimmedMean = trimmedResults.reduce((a, b) => a + b, 0) / trimmedResults.length;
    trimmedMean = Math.round(trimmedMean);

    console.log('trimmedMean:', trimmedMean);
    res.json({ calories: trimmedMean });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});