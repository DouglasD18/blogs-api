const loginServices = require('../services/loginServices');

const loginController = {
    async login(req, res) {
        const { body } = req;
        const response = await loginServices.login(body);
        if (response.token) {
            return res.status(response.code).json({ token: response.token });
        }
        return res.status(response.code).json({ message: response.message });
    },
};

module.exports = loginController;
