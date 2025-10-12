const app = require('./app');
const sequelize = require('./config/db.config');
const dotenv = require('dotenv');


dotenv.config();

const PORT = process.env.PORT || 3000;


sequelize.sync({ alter: true }) // Use only during development
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((err) => {
        console.error('Database sync failed:', err);
    });
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});