const express = require('express');
const router = express.Router();

const aulas = [];

function createAulas() {
  for (let index = 0; index < 20; index++) {
    aulas.push({
      aula: index + 2,
      edificio: Math.floor(Math.random() * 4) + 1,
    });
  }
}

createAulas();

router.get('/', (req, res) => {
  const { aula } = req.query;
  if (aula) {
    const aulaInfo = aulas.find((aulas) => aulas.NumAula === parseInt(aula));
    if (!aulaInfo) {
      return res
        .status(400)
        .json({ message: 'No se encontro el aula que esta buscando' });
    }
    return res.json(aulaInfo);
  }
  res.json(aulas);
});

router.post('/', (req, res) => {
  const newAula = req.body;
  const existe = aulas.find((aulas) => aulas.aula === newAula.aula);
  if (existe) {
    return res.status(400).json({
      message: 'El número de aula que intentas registrar ya existe',
    });
  }
  aulas.push(newAula);
  res.json({
    message: 'Se ha creado una nueva aula',
    Nueva_Aula: newAula,
  });
});

module.exports = router;
