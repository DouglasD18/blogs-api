const { DataTypes } = require('sequelize');

/** @type {import('sequelize').ModelAttributes} */
const attributes = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
  }

/** @param {import('sequelize').Sequelize} sequelize */
module.exports = (sequelize) => {
    const Category = sequelize.define('Category', attributes, {
      timestamps: false,
      tableName: 'Categories',
    });
  
    return Category;
  };