const express = require('express');
const materiaslib = require('../lib/materiaslib');
const router = express.Router();
const { profesores } = require('../lib/capro');

const materias = [];

function createMaterias() {
  for (let index = 0; index < materiaslib.length; index++) {
    materias.push({
      clave: index + 1,
      nombre: materiaslib[index],
      profesor: profesores[index] + ' - idProfesor: ' + (index + 100),
      aula: index + 2,
    });
  }
}

router.get('/', (req, res) => {
  const { clave } = req.query;
  if (clave) {
    const materiaClave = materias.find(
      (materias) => materias.clave === parseInt(clave)
    );
    if (!materiaClave) {
      return res.status(400).json({ message: 'No se encontro la materia' });
    }
    return res.json(materiaClave);
  }
  res.json(materias);
});

router.post('/', (req, res) => {
  const nuevaMateria = req.body; // -> Obtener el cuerpo de la petición
  const existe = materias.find(
    (materias) => materias.clave === nuevaMateria.clave
  );
  if (existe) {
    return res.status(400).json({
      message: 'La clave que deseas usar para esta materia, ya existe',
    });
  }
  materias.push(nuevaMateria);
  res.json({
    message: 'La materia ha sido creada',
    nuevaMateria: nuevaMateria,
  });
});

createMaterias();

module.exports = router;
