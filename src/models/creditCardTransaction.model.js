const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CreditCardTransaction = sequelize.define('CreditCardTransaction', {
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
        cardId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'creditcards',
                key: 'id'
            }
        },
        itemName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },

        purchaseDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }

    }, {
        tableName: 'creditcard_transaction',
        timestamps: true,
    });
    return CreditCardTransaction;
};

