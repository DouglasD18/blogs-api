const { Category } = require('../database/models');

const categoriesServices = {
    async addCategory(name) {
        if (!name) {
            return { code: 400, message: '"name" is required' };
        }
        const category = await Category.create({ name });
        return category;
    },
    async getAll() {
        const categories = await Category.findAll();
        return categories;
    },
};

module.exports = categoriesServices;
