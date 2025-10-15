const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Emi = sequelize.define('Emi', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        itemName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        monthlyAmount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        tenure: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        paid: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        firstDueDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
        
    }, {
        tableName: 'emi',
        timestamps: true,
    });
    return Emi;
};

