const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Bank = sequelize.define('Bank', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        accountNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bankName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        balance: {
            type: DataTypes.STRING,
            allowNull: false
        }        
    }, {
        tableName: 'bank',
        timestamps: true,
    });
    return Bank;
};

