const { blogPost } = require('../database/models');

const postServices = {
    async getAll() {
        const posts = await blogPost.findAll();
        return posts;
    },
};

module.exports = postServices;
