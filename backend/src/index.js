const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const imageCaloriesRequest = require('./chatGPTcommunication');
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
            console.log('chatResponse:', chatResponse);
            const foodArray = createJSONfromChatResponse(chatResponse);
            console.log(foodArray);
            res.json(foodArray);
        } else {
            console.error('chatResponse is null');
        }
    }
    getAndSendChatResponse();
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});