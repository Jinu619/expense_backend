const sequelize = require('../config/db.config');

const User = require('./user.model')(sequelize);
const Category = require('./category.model')(sequelize);
const Expense = require('./Expense.model')(sequelize);
const CreditCard = require('./creditCard.model')(sequelize);
const CreditCardTransaction = require('./creditCardTransaction.model')(sequelize);
const Emi = require('./emi.model')(sequelize);
const Bank = require('./bank.model')(sequelize);
const BankTransaction = require('./bankTransaction.model')(sequelize);

// Define associations
User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

CreditCard.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(CreditCard, { foreignKey: 'userId' });

CreditCardTransaction.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(CreditCardTransaction, { foreignKey: 'userId' });

CreditCardTransaction.belongsTo(CreditCard, { foreignKey: 'cardId' });
CreditCard.hasMany(CreditCardTransaction, { foreignKey: 'cardId' });

Emi.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Emi, { foreignKey: 'userId' });

Bank.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Bank, { foreignKey: 'userId' });

BankTransaction.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(BankTransaction, { foreignKey: 'userId' });
BankTransaction.belongsTo(Bank, { foreignKey: 'bankId' });
Bank.hasMany(BankTransaction, { foreignKey: 'bankId' });
BankTransaction.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(BankTransaction, { foreignKey: 'categoryId' });

module.exports = {
    sequelize,
    User,
    Category,
    Expense,
    CreditCard,
    CreditCardTransaction,
    Emi,
    Bank,
    BankTransaction
};
