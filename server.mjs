import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs/promises";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/images', express.static('images'));

const apiKey = process.env.GEMINI_API_KEY;
const apiKey1 = process.env.GEMINI_API_KEY_1;
const apiKey2 = process.env.GEMINI_API_KEY_2;
const apiKey3 = process.env.GEMINI_API_KEY_3;
const apiKey4 = process.env.GEMINI_API_KEY_4;
const apiKey5 = process.env.GEMINI_API_KEY_5;
const apiKey6 = process.env.GEMINI_API_KEY_6;
const apiKey7 = process.env.GEMINI_API_KEY_7;
const apiKey8 = process.env.GEMINI_API_KEY_8;
const apiKey9 = process.env.GEMINI_API_KEY_9;
const apiKey10 = process.env.GEMINI_API_KEY_10;

async function generateAndSaveImage(req, res, prompt, filename, api_key) {
    console.log(`Received POST request to /${filename}`);
    console.log('Request body:', req.body);
    console.log('Using API key:', api_key); 
    try {
        console.log(`Attempting Gemini API call for ${filename}...`);
        const ai = new GoogleGenAI({ apiKey: api_key });

        const contents = prompt;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-exp-image-generation",
            contents: contents,
            config: {
                responseModalities: ["Text", "Image"],
            },
        });

        console.log('Gemini API response for ' + filename + ':', response);

        if (response.candidates[0].content.parts[0].inlineData) {
            const imageData = response.candidates[0].content.parts[0].inlineData.data;
            const mimeType = response.candidates[0].content.parts[0].inlineData.mimeType;

            const imageBuffer = Buffer.from(imageData, 'base64');
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            const imagePath = path.join(__dirname, 'images', `${filename}.png`);

            console.log('Saving image to:', imagePath);
            console.log('Image data (base64):', imageData);
            console.log('Image buffer:', imageBuffer);

            try {
                await fs.writeFile(imagePath, imageBuffer);
                console.log(`${filename} image saved successfully`);
                res.json({ imageUrl: `/images/${filename}.png` });
            } catch (writeError) {
                console.error(`Error saving ${filename} image:`, writeError);
                res.status(500).send(`Error saving ${filename} image: ${writeError.message}`);
            }
        } else {
            res.status(500).send("Image data not found.");
        }
    } catch (error) {
        console.error(`Gemini API error for ${filename}:`, error);
        res.status(500).send(error.message);
    }
}

app.post('/background', (req, res) => {
    const prompt = `Generate a background image of ${req.body.prompt} for a website background. The image should be wide (horizontal) and in PNG format.`;
    generateAndSaveImage(req, res, prompt, 'background', apiKey);
});

app.post('/blueGem', (req, res) => {
    const prompt = `Generate an icon of a blue gem with ${req.body.prompt} theme. The image should be square and in PNG format with black background.`;
    generateAndSaveImage(req, res, prompt, 'blueGem', apiKey1);
});

app.post('/redGem', (req, res) => {
    const prompt = `Generate an icon of a red gem with ${req.body.prompt} theme. The image should be square and in PNG format with black background.`;
    generateAndSaveImage(req, res, prompt, 'redGem', apiKey2);
});

app.post('/yellowGem', (req, res) => {
    const prompt = `Generate an icon of a yellow gem with ${req.body.prompt} theme. The image should be square and in PNG format with black background.`;
    generateAndSaveImage(req, res, prompt, 'yellowGem', apiKey3);
});

app.post('/purpleGem', (req, res) => {
    const prompt = `Generate an icon of a purple gem with ${req.body.prompt} theme. The image should be square and in PNG format with black background.`;
    generateAndSaveImage(req, res, prompt, 'purpleGem', apiKey4); 
});

app.post('/greenGem', (req, res) => {
    const prompt = `Generate an icon of a green gem with ${req.body.prompt} theme. The image should be square and in PNG format with black background.`;
    generateAndSaveImage(req, res, prompt, 'greenGem', apiKey5); 
});

app.post('/zeus', (req, res) => {
    const prompt = `Generate an icon of a slotmachine scatter symbol with ${req.body.prompt} theme. The image should be square and in PNG format with black background.`;
    generateAndSaveImage(req, res, prompt, 'zeus', apiKey6); 
});

app.post('/crown', (req, res) => {
    const prompt = `Generate an icon of a crown with ${req.body.prompt} theme. The image should be square and in PNG format with black background.`;
    generateAndSaveImage(req, res, prompt, 'crown', apiKey7); 
});

app.post('/hourglass', (req, res) => {
    const prompt = `Generate an icon of a hourglass with ${req.body.prompt} theme. The image should be square and in PNG format with black background.`;
    generateAndSaveImage(req, res, prompt, 'hourglass', apiKey8); 
});

app.post('/ring', (req, res) => {
    const prompt = `Generate an icon of a ring with ${req.body.prompt} theme. The image should be square and in PNG format with black background.`;
    generateAndSaveImage(req, res, prompt, 'ring', apiKey9); 
});

app.post('/goblet', (req, res) => {
    const prompt = `Generate an icon of a goblet with ${req.body.prompt} theme. The image should be square and in PNG format with black background.`;
    generateAndSaveImage(req, res, prompt, 'goblet', apiKey10); 
})

app.listen(port, () => console.log(`Server listening on port ${port}`));