import express from "express";
import fetch from "node-fetch"; // 

const app = express(); // Tu avais oublié de créer l'instance `app`

// Middleware pour parser les corps de requête JSON
app.use(express.json());

// Endpoint POST /action
app.post('/action', async (req, res) => {
  if (!req.body || !req.body.action) {
    return res.status(400).json({ msg: 'body is malformed' });
  }

  const { action } = req.body;

  if (action !== 'joke' && action !== 'cat fact') {
    return res.status(400).json({ msg: 'body is malformed' });
  }

  try {
    if (action === 'joke') {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();
      const joke = `${data.setup} ${data.punchline}`.toUpperCase();
      return res.status(200).json({ joke });
    } else if (action === 'cat fact') {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=11', {
        headers: {
          'x-api-key': 'votre_clé_api_ici' // Remplace par ta clé API
        }
      });
      const data = await response.json();
      return res.status(200).json({ length: data.length.toString() });
    }
  } catch (error) {
    return res.status(500).json({ msg: 'Erreur serveur' });
  }
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});
