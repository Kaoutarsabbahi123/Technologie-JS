const express = require('express');
const app = express();
app.use(express.json());  

const port = 3000;
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

let items = [];

app.post('/items', (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).send('Item ajouté avec succès');
});

app.get('/items', (req, res) => {
    res.status(200).json(items);
  });

  
  app.get('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = items.find(i => i.id === id);
  
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).send('Item non trouvé');
    }
  });

  
  app.put('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const itemIndex = items.findIndex(i => i.id === id);
  
    if (itemIndex !== -1) {
      items[itemIndex] = { ...items[itemIndex], ...req.body };
      res.status(200).send('Item mis à jour');
    } else {
      res.status(404).send('Item non trouvé');
    }
  });

  app.delete('/items/:id', (req, res) => {
    const id = parseInt(req.params.id);
    items = items.filter(i => i.id !== id);
    res.status(200).send('Item supprimé');
  });


