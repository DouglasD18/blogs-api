const { blogPost, User, Category } = require('../database/models');

const postServices = {
    async getAll() {
        const posts = await blogPost.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ['password'] },
                },
                { model: Category, as: 'categories' },
            ],
        });
        return posts;
    },
};

module.exports = postServices;
