const alumnosRoutes = require('./alumnoRoutes');

function routerApp(app) {
  app.use('/alumnos', alumnosRoutes);
}

module.exports = routerApp;
