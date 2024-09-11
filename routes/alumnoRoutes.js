const express = require('express');
const materias = require('../lib/materias');
const router = express.Router();
const { faker } = require('@faker-js/faker');
const { carreras } = require('../lib/capro');

const alumnos = [];

function crearAlumno() {
  for (let index = 0; index < 20; index++) {
    const materiasAleatorias = seleccionarMateriasAleatorias(materias);
    let genre = Math.random() < 0.5 ? 'female' : 'male';
    alumnos.push({
      matricula: faker.number.int({ max: 10000 }),
      student: faker.person.firstName(genre),
      carrera: carreras[Math.floor(Math.random() * 5)], // 3.46
      age: Math.floor(Math.random() * 10) + 18,
      genre: genre,
      materia_1: materiasAleatorias[0],
      materia_2: materiasAleatorias[1],
      materia_3: materiasAleatorias[2],
    });
  }
}

// 0 - 1 0.2 0.4 0.8

// Función para seleccionar 3 materias aleatorias
function seleccionarMateriasAleatorias(materias) {
  const seleccionadas = [];
  while (seleccionadas.length < 3) {
    const indiceAleatorio = Math.floor(Math.random() * materias.length);
    const materiaSeleccionada = materias[indiceAleatorio];
    if (!seleccionadas.includes(materiaSeleccionada)) {
      seleccionadas.push(materiaSeleccionada);
    }
  }
  return seleccionadas;
}

crearAlumno();

module.exports = router;
