const categoriesServices = require('../services/categoriesServices');

const categoriesController = {
    async addCategory(req, res) {
        const { name } = req.body;
        const category = await categoriesServices.addCategory(name);
        if (category.code) {
            const { code, message } = category;
            return res.status(code).json({ message });
        }
        return res.status(201).json(category);
    },
    async getAll(_req, res) {
        const categories = await categoriesServices.getAll();
        return res.status(200).json(categories);
    },
};

module.exports = categoriesController;
