const postServices = require('../services/postServices');

const postController = {
    async getAll(_req, res) {
        const posts = await postServices.getAll();
        return res.status(200).json(posts);
    },
};

module.exports = postController;
