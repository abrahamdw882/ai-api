const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;

app.post('/api/generate-answer', async (req, res) => {
    const { question } = req.body;

    try {
        const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
            method: 'POST',
            data: {
                contents: [{ parts: [{ text: question }] }],
            },
        });

        res.json(response.data); // Send back the response from the API
    } catch (error) {
        console.error(error.message);
        res.status(error.response?.status || 500).json({
            error: error.message || 'Something went wrong',
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
