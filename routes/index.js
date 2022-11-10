const express = require("express");
const routes = express.Router();

const base = require('../controllers');
const auth = require('../controllers/AuthController');
const dokter = require('../controllers/DokterController');
const igd = require('../controllers/IgdController');

const middleware = require('../middlewares');

routes.get('/', base.home);

// routes.post('/auth/register', auth.register);
routes.post('/auth/login', auth.login);
routes.post('/auth/login/dokter', auth.dokter);
routes.get('/pasien/registasiawal',middleware.login, dokter.pasien);
routes.get('/pasien/rkm_medis',middleware.login, dokter.rkm_medis);
routes.get('/obat/cari',middleware.login, dokter.getObat);
routes.post('/igd/regis', middleware.login, igd.regis);

module.exports = routes;