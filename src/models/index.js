const sequelize = require('../config/db.config');

const User = require('./user.model')(sequelize);
const Category = require('./category.model')(sequelize);
const Expense = require('./Expense.model')(sequelize);
const CreditCard = require('./creditCard.model')(sequelize);
const CreditCardTransaction = require('./creditCardTransaction.model')(sequelize);

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

module.exports = {
    sequelize,
    User,
    Category,
    Expense,
    CreditCard,
    CreditCardTransaction
};
