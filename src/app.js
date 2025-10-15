const express = require('express');
const cors = require("cors");
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
const authRoutes = require('./routes/auth.routes');
const expenseRoutes = require('./routes/expense.routes');
const commonRoutes = require('./routes/common.routes');
const cardsRoutes = require('./routes/cards.routes');
const emiRoutes = require('./routes/emi.routes');
const profileRoutes = require('./routes/profile.routes');
const authenticateJWT = require('./middlewares/auth.middlware');


app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expense', authenticateJWT, expenseRoutes);
app.use('/api/category', authenticateJWT, commonRoutes);
app.use('/api/cards', authenticateJWT, cardsRoutes);
app.use('/api/emi', authenticateJWT, emiRoutes);
app.use('/api/user', authenticateJWT, profileRoutes);

app.get('/', (req, res) => {
    res.send('Hello World from Node.js Boilerplate!');
});

module.exports = app;
