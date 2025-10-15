const express = require('express');
const router = express.Router();
const userController = require('../controllers/common/userController');


router.get('/getprofile', userController.getprofile);
router.patch('/updateprofile', userController.updateprofile);
router.patch('/changepassword', userController.changePassword);
router.patch('/updatePin', userController.updatePin);
router.post('/validatePin', userController.validatePin);


module.exports = router;
