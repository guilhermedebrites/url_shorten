const express = require('express');
const { nanoid } = require('nanoid');

const app = express();
const PORT = 3000;

app.use(express.json());
const urlDatabase = new Map();

app.post('/shorten', (req, res) => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ error: 'URL é obrigatória' });

  const id = nanoid(6);
  urlDatabase.set(id, url);

  const shortUrl = `http://localhost:${PORT}/${id}`;
  res.json({ shortUrl });
});

app.get('/:id', (req, res) => {
  const originalUrl = urlDatabase.get(req.params.id);
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL não encontrada');
  }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
