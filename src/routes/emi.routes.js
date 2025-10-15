const express = require('express');
const router = express.Router();
const emiController = require('../controllers/emi/emiController');

router.get('/', emiController.index);
router.get('/list', emiController.listEmi);
router.post('/create', emiController.createEmi);
router.get('/search/:id', emiController.searchEmi);
router.patch('/update/:id', emiController.updateEmi);
router.delete('/delete/:id', emiController.deleteEmi);

module.exports = router;
