const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      published: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: false,
      }
};

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
  const BlogPosts = sequelize.define('BlogPosts', attributes, { tableName: 'BlogPosts' });
  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.User,
    { foreignKey: 'userId', as: 'user' });
  }
  return BlogPosts;
};
