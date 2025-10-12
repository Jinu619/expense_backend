const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense/expenseController');

router.get('/', expenseController.index);
router.get('/list', expenseController.listExpense);
router.post('/create', expenseController.createExpense);
router.get('/search/:id', expenseController.searchExpense);
router.patch('/update/:id', expenseController.updateExpense);
router.delete('/delete/:id', expenseController.deleteExpense);

module.exports = router;
