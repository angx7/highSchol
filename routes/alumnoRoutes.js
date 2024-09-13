const express = require('express');
const materias = require('../lib/materiaslib');
const router = express.Router();
const { faker } = require('@faker-js/faker');
const { carreras } = require('../lib/capro');

const alumnos = [];

function traducirGenero(genero) {
  switch (genero) {
    case 'female':
      return 'femenino';
    case 'male':
      return 'masculino';
    default:
      return 'género no especificado';
  }
}

function crearAlumno() {
  for (let index = 0; index < 20; index++) {
    const [materiasAleatorias, clave] = seleccionarMateriasAleatorias(materias);
    let genero = Math.random() < 0.5 ? 'female' : 'male';
    let generoTraducido = traducirGenero(genero);

    alumnos.push({
      matricula: faker.number.int({ max: 10000 }),
      estudiante: faker.person.firstName(genero),
      carrera: carreras[Math.floor(Math.random() * 5)], // 3.46
      edad: Math.floor(Math.random() * 10) + 18,
      genero: generoTraducido,
      materia_1: materiasAleatorias[0] + ' - clave: ' + clave[0],
      materia_2: materiasAleatorias[1] + ' - clave: ' + clave[1],
      materia_3: materiasAleatorias[2] + ' - clave: ' + clave[2],
    });
  }
}

// 0 - 1 0.2 0.4 0.8

// Función para seleccionar 3 materias aleatorias
function seleccionarMateriasAleatorias(materias) {
  const seleccionadas = [];
  const claveMateria = [];
  while (seleccionadas.length < 3) {
    const indiceAleatorio = Math.floor(Math.random() * materias.length);
    const materiaSeleccionada = materias[indiceAleatorio];
    if (!seleccionadas.includes(materiaSeleccionada)) {
      claveMateria.push(indiceAleatorio + 1);
      seleccionadas.push(materiaSeleccionada);
    }
  }
  return [seleccionadas, claveMateria];
}

crearAlumno();

//GET all students
//172.18.70.44:3000/alumnos -> todo
//172.18.70.44:3000/alumnos?matricula=`79212` -> objeto que corresponde a la matricula / error = No se encontro el estudiante
router.get('/', (req, res) => {
  const { matricula } = req.query;
  if (matricula) {
    const alumnoMatricula = alumnos.find(
      (alumnos) => alumnos.matricula === parseInt(matricula)
    );
    if (!alumnoMatricula) {
      return res.status(400).json({ message: 'No se encontro el estudiante' });
    }
    return res.json(alumnoMatricula);
  }
  res.json(alumnos);
});

//POST route -> Envio de datos al arreglo (usuario)

router.post('/', (req, res) => {
  const nuevoAlumno = req.body; // -> Obtener el cuerpo de la petición
  const existe = alumnos.find(
    (alumnos) => alumnos.matricula === nuevoAlumno.matricula
  );
  if (existe) {
    return res
      .status(400)
      .json({ message: 'La matricula que quieres, ya existe' });
  }
  alumnos.push(nuevoAlumno);
  res.json({ message: 'El alumno ha sido agregado', nuevoAlumno: nuevoAlumno });
});

module.exports = router;
