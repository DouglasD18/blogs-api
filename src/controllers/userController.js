const userServices = require('../services/userServices');

const userController = {
    async addUser(req, res) {
        const { body } = req;
        const response = await userServices.addUser(body);
        if (response.token) {
            const { code, token } = response;
            res.status(code).json({ token });
        }
        const { code, message } = response;
        res.status(code).json({ message });
    },
    async getAll(_req, res) {
        const users = await userServices.getAll();
        res.status(200).json(users);
    },
};

module.exports = userController;
