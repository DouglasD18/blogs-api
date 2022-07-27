const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
    postId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
    },
}

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
    const PostCategory = sequelize.define('PostCategory', attributes, {
      timestamps: false,
      tableName: 'PostCategories',
    });
    PostCategory.associate = (models) => {
        models.BlogPost.belongsToMany(models.Category, {
            through: PostCategory,
            foreignKey: 'postId',
            otherKey: 'categoryId',
            as: 'categories',
        });

        models.Category.belongsToMany(models.BlogPost, {
            through: PostCategory,
            foreignKey: 'categoryId',
            otherKey: 'postId',
            as: 'posts',
        });
    }; 
    return PostCategory;
  }
  