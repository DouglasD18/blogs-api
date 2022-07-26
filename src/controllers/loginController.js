const loginServices = require('../services/loginServices');

const loginController = {
    async login(req, res) {
        const { body } = req;
        const response = await loginServices.login(body);
        const { code, message } = response;
        res.status(code).json({ message });
    },
};

module.exports = loginController;
