const express = require('express');
const router = express.Router();
const cardController = require('../controllers/card/cardController');
const cardTransactionController = require('../controllers/card/cardTransactionController');

router.get('/', cardController.index);
router.get('/list', cardController.listCard);
router.post('/create', cardController.createCard);
router.get('/search/:id', cardController.searchCard);
router.patch('/update/:id', cardController.updateCard);
router.delete('/delete/:id', cardController.deleteCard);

router.get('/transaction/list', cardTransactionController.index);
router.get('/transaction/list/:id', cardTransactionController.listTransaction);
router.post('/transaction/create', cardTransactionController.createTransaction);
// router.get('/transaction/search/:id', cardTransactionController.searchTransaction);
router.patch('/transaction/update/:id', cardTransactionController.updateTransaction);
router.delete('/transaction/delete/:id', cardTransactionController.deleteTransaction);

module.exports = router;
