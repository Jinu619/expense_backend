const sequelize = require('../config/db.config');

const User = require('./user.model')(sequelize);
const Category = require('./category.model')(sequelize);
const Expense = require('./Expense.model')(sequelize);


Category.hasMany(Expense, { foreignKey: 'categoryId' });
Expense.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = {
    sequelize,
    User,
    Category,
    Expense
};
