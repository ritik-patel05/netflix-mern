const express = require('express');
const router = express.Router();
const { login, signup, updateUser, deleteUser, getUser, getAllUsers, getUserStatisticsInLastYear } = require('../controllers/user.controller');

router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/:id').put(updateUser);
router.route('/:id').delete(deleteUser);
router.route('/find/:id').get(getUser);
router.route('/').get(getAllUsers);
router.route('/stats').get(getUserStatisticsInLastYear);

module.exports = router;
