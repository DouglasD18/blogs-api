const { Router } = require('express');
const categoriesController = require('../controllers/categoriesController');
const autentication = require('../middlewares/autentication');

const categoriesRoute = Router();

categoriesRoute.post('/', autentication, categoriesController.addCategory);
categoriesRoute.get('/', autentication, categoriesController.getAll);

module.exports = categoriesRoute;
