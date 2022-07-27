const userServices = require('../services/userServices');

const userController = {
    async addUser(req, res) {
        const { body } = req;
        const response = await userServices.addUser(body);
        if (response.token) {
            const { code, token } = response;
            return res.status(code).json({ token });
        }
        const { code, message } = response;
        return res.status(code).json({ message });
    },
    async getAll(_req, res) {
        const users = await userServices.getAll();
        return res.status(200).json(users);
    },
    async getById(req, res) {
        const { id } = req.params;
        const user = await userServices.getById(id);
        if (user.code) {
            const { code, message } = user;
            return res.status(code).json({ message });
        }
        return res.status(200).json(user);
    },
};

module.exports = userController;
