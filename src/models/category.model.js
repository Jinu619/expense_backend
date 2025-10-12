const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db.config');

module.exports = (sequelize) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'category', // Ensure this matches your actual table name in the DB
        timestamps: true,
    });
    return Category;
};
