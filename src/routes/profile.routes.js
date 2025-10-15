const express = require('express');
const router = express.Router();
const userController = require('../controllers/common/userController');


router.get('/getprofile', userController.getprofile);
router.patch('/updateprofile', userController.updateprofile);
router.patch('/changepassword', userController.changePassword);
router.patch('/updatePin', userController.updatePin);


module.exports = router;
