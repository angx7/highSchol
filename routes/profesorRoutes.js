const express = require('express');
const { profesores, carreras } = require('../lib/capro');
const router = express.Router();

const turno = ['Matutino', 'Vespertino', 'Completo'];

const profesor = [];

function createProfesor() {
  for (let index = 0; index < profesores.length; index++) {
    profesor.push({
      profesorId: index + 100,
      nombre: profesores[index],
      carrera: carreras[Math.floor(Math.random() * 5)],
      turno: turno[Math.floor(Math.random() * 3)],
      /*
        Explicación:
        - `Math.random()` genera un número decimal entre 0 (incluido) y 1 (excluido).
        - Multiplicamos por 3 para obtener un rango de 0 a 2.999...
        - Luego, `Math.floor()` redondea hacia abajo, asegurando que el resultado sea 0, 1 o 2.
        */
    });
  }
}

createProfesor();

router.get('/', (req, res) => {
  const { idProfesor } = req.query;
  if (idProfesor) {
    const profesorId = profesor.find(
      (profesor) => profesor.profesorId === parseInt(idProfesor)
    );
    if (!profesorId) {
      return res
        .status(400)
        .json({ message: 'No se encontro el profesor que intenta consultar' });
    }
    return res.json(profesorId);
  }
  res.json(profesor);
});

router.post('/', (req, res) => {
  const nuevoProfesor = req.body;
  const existe = profesor.find(
    (profesor) => profesor.profesorId === nuevoProfesor.profesorId
  );
  if (existe) {
    return res.status(400).json({
      message: 'El ID de profesor que intentas registrar ya existe',
    });
  }
  profesor.push(nuevoProfesor);
  res.json({
    message: 'El profesor ha sido registrado',
    nuevoProfesor: nuevoProfesor,
  });
});

module.exports = router;
