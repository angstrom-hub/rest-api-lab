const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // Parse JSON bodies

let products = []; // In-memory product list
let currentId = 1;

// GET /items
app.get('/items', (req, res) => {
  res.json(products);
});

// POST /items
app.post('/items', (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: currentId++, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /items/:id
app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const product = products.find(p => p.id == id);
  if (!product) return res.status(404).json({ message: "Not found" });

  product.name = name || product.name;
  product.price = price || product.price;
  res.json(product);
});

// DELETE /items/:id
app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  products = products.filter(p => p.id != id);
  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
