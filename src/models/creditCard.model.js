const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CreditCard = sequelize.define('CreditCard', {
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
        cardName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        billAmount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        statementDay: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        billDay: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    }, {
        tableName: 'creditcards',
        timestamps: true,
    });
    return CreditCard;
};

