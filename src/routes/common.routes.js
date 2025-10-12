const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/common/categoryController');

router.get('/', categoryController.index);
router.get('/list', categoryController.listCategory);

module.exports = router;
