const express = require('express');
const routerApp = require('./routes/routes');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hola mi servidor en Express');
});

routerApp(app);

app.listen(port, () => {
  console.log('My port is working on: ' + port);
});
