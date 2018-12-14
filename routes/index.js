var keystone = require('keystone');
var importRoutes = keystone.importer(__dirname);

var routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api')
};

exports = module.exports = function (app) {
  app.get('/', routes.views.index);
  app.get('/add-lead', routes.views.addLead);
  app.post('/add-lead', routes.api.lead.post);
  app.get('/test', (req, res) => { res.send('Damn!!!')})
};