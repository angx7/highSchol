const alumnosRoutes = require('./alumnoRoutes');
const materiasRoutes = require('./materiaRoutes');
const profesoresRoutes = require('./profesorRoutes');
const aulasRoutes = require('./aulasRoutes');

function routerApp(app) {
  app.use('/alumnos', alumnosRoutes);
  app.use('/materias', materiasRoutes);
  app.use('/profesores', profesoresRoutes);
  app.use('/aulas', aulasRoutes);
}

module.exports = routerApp;
