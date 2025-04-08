import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath
import { dirname } from 'path'; // Import dirname

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/images', express.static('images')); // Serve static images

app.get('/test', (req, res) => {
    res.send('Server is working!');
});

const apiKey = process.env.GEMINI_API_KEY;

app.post('/generate-image', async (req, res) => {
    console.log('Received POST request to /generate-image');
    console.log('Request body:', req.body);

    try {
        console.log('Attempting Gemini API call...');
        const ai = new GoogleGenAI({ apiKey: apiKey });

        const contents = `Generate a background image of ${req.body.prompt} for a website. The image should be wide (horizontal) and in PNG format.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp-image-generation",
            contents: contents,
            config: {
                responseModalities: ["Text", "Image"],
            },
        });

        if (response.candidates[0].content.parts[0].inlineData) {
            const imageData = response.candidates[0].content.parts[0].inlineData.data;
            const mimeType = response.candidates[0].content.parts[0].inlineData.mimeType;

            // Save the image to a file
            const imageBuffer = Buffer.from(imageData, 'base64');
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            const imagePath = path.join(__dirname, 'images', 'generated-image.png');
            await fs.writeFile(imagePath, imageBuffer);

            res.json({ imageUrl: `/images/generated-image.png` }); // Send image URL
        } else {
            res.status(500).send("Image data not found.");
        }

    } catch (error) {
        console.error('Gemini API error:', error);
        res.status(500).send(error.message);
    }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));