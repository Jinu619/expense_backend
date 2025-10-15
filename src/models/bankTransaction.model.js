const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const BankTransaction = sequelize.define('BankTransaction', {
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
        bankId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'bank',
                key: 'id'
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'category',
                key: 'id'
            }
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false
        },

        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }

    }, {
        tableName: 'bank_transaction',
        timestamps: true,
    });
    return BankTransaction;
};

