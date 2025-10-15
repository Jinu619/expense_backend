const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db.config');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        pin: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'users',
        timestamps: true,
    });
    return User;
};
