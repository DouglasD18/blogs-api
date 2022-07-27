const { Router } = require('express');
const postController = require('../controllers/postController');
const autentication = require('../middlewares/autentication');

const postRoute = Router();

// postRoute.post('/', autentication, postController.addCategory);
postRoute.get('/', autentication, postController.getAll);

module.exports = postRoute;
