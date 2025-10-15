const express = require('express');
const router = express.Router();
const bankController = require('../controllers/wallet/bankController');
const bankTransactionController = require('../controllers/wallet/bankTransactionController');

router.get('/', bankController.index);
router.get('/list', bankController.listBank);
router.post('/create', bankController.createBank);
router.get('/search/:id', bankController.searchBank);
router.patch('/update/:id', bankController.updateBank);
router.delete('/delete/:id', bankController.deleteBank);
router.get('/balance_check/:id', bankController.realTimeBalanceCheck);

router.get('/transaction/', bankTransactionController.index);
router.get('/transaction/list/:id', bankTransactionController.listBankTransaction);
router.post('/transaction/create/:id', bankTransactionController.createBankTransaction);
router.get('/transaction/search/:id', bankTransactionController.searchBankTransaction);
router.patch('/transaction/update/:id', bankTransactionController.updateBankTransaction);
router.delete('/transaction/delete/:id', bankTransactionController.deleteBankTransaction);


module.exports = router;
