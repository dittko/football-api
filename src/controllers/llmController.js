const { getPlayersFromGemini } = require('../services/gemini');

exports.getAll = async (req, res) => {
  try {
    const players = await getPlayersFromGemini();
    res.json(players);
  } catch {
    res.status(500).json({ error: 'Błąd pobierania danych LLM' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const players = await getPlayersFromGemini();
    const player = players.find(p => p.id === req.params.id);
    if (!player) return res.status(404).json({ error: 'Nie znaleziono piłkarza' });
    res.json(player);
  } catch {
    res.status(500).json({ error: 'Błąd pobierania obiektu' });
  }
};

exports.filter = async (req, res) => {
  try {
    const players = await getPlayersFromGemini();
    const filters = req.query;

    const filtered = players.filter(player =>
      Object.entries(filters).every(([key, val]) =>
        String(player[key]).toLowerCase() === val.toLowerCase()
      )
    );

    res.json(filtered);
  } catch {
    res.status(500).json({ error: 'Błąd filtrowania' });
  }
};
