const axios = require('axios');
require('dotenv').config();

const PROMPTS = {
  TOP_PLAYERS: `Wygeneruj 10 fikcyjnych piłkarzy i podaj ich dane w formacie JSON z polami:
- id - name - position (bramkarz, obrońca, pomocnik, napastnik) - number - club - nationality - age
Przykład:
{
  "players": [
    {
      "id": "1",
      "name": "Jan Kowalski",
      "position": "napastnik",
      "number": 9,
      "club": "FC Kraków",
      "nationality": "Polska",
      "age": 28
    }
  ]
}`
};

let cache = null;

async function getPlayersFromGemini() {
  if (cache) return cache;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: PROMPTS.TOP_PLAYERS }]
          }
        ]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const text = response.data.candidates[0].content.parts[0].text;
    const cleaned = text.replace(/```json|```/g, '').trim();
    const json = JSON.parse(cleaned);
    cache = json.players;
    return cache;
  } catch (err) {
    console.error(' Błąd Gemini:', err.response?.data || err.message);
    throw err;
  }
}

module.exports = { getPlayersFromGemini };
