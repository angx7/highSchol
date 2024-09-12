const express = require('express');
const router = express.Router();

const Aulas = [];
function createAulas() {
  for (let index = 0; index < 20; index++) {
    Aulas.push({
      NumAula: index + 2,
      edificio: Math.floor(Math.random() * 4) + 1,
    });
  }
}
createAulas();

router.get('/', (req, res) => {
  const { aula } = req.query;
  if (aula) {
    const aulaInfo = Aulas.find((Aulas) => Aulas.NumAula === parseInt(aula));
    if (!aulaInfo) {
      return res
        .status(400)
        .json({ message: 'No se encontro el aula que esta buscando' });
    }
    return res.json(aulaInfo);
  }
  res.json(Aulas);
});

router.post('/', (req, res) => {
  const newAula = req.body;
  const existe = Aulas.find((Aulas) => Aulas.NumAula === newAula.NumAula);
  if (existe) {
    return res.status(400).json({
      message: 'El número de aula que intentas registrar ya existe',
    });
  }
  Aulas.push(newAula);
  res.json({
    message: 'Se ha creado una nueva aula',
    Nueva_Aula: newAula,
  });
});
module.exports = router;
