const { Router } = require('express');
const userController = require('../controllers/userController');
const autentication = require('../middlewares/autentication');

const userRoute = Router();

userRoute.post('/', userController.addUser);
userRoute.get('/', autentication, userController.getAll);

module.exports = userRoute;
