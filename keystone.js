const keystone = require("keystone");
const ejs = require('ejs')
keystone.init({
  "brand": 'MTL-Dashboard',
  "signin logo" : ["https://pbs.twimg.com/profile_images/1013798240683266048/zRim1x6M_400x400.jpg", 100, 100],
  "cookie secret": "PanHeadSteve",
  'name': "MTL-Dashboard",
  "user model": "User",
  'auth': true,
  "auto update": true,
  'views': 'templates/views',
  'view engine': 'ejs',
});
keystone.import('models');
keystone.set('routes', require('./routes'));
keystone.start();
