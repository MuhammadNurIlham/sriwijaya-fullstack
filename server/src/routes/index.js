const express = require('express');
const router = express.Router();

const { addUser, getUsers, getUser, updateUser, deleteUser } = require('../../src/controllers/userController');
const { addRole, getRoles, getRole, updateRole, deleteRole } = require('../controllers/roleController');
const { addDetailUser, getDetailUser, updateDetailUser, deleteDetailUser } = require('../controllers/detailUserController');
const { register, login, checkAuth } = require('../controllers/authController');
const { auth } = require('../middlewares/authMiddleware');


// Route For User
router.post('/create-user', auth, addUser);
router.get('/users', getUsers);
router.get('/user/:id', auth, getUser);
router.patch('/update-user/:id', auth, updateUser);
router.delete('/delete-user/:id', auth, deleteUser);

router.post('/create-role', addRole);
router.get('/roles', getRoles);
router.get('/role/:id', getRole);
router.patch('/update-role/:id', updateRole);
router.delete('/delete-role/:id', deleteRole);

router.post('/create-detail-user', auth, addDetailUser);
router.get('/detail-user/:id', auth, getDetailUser);
router.patch('/update-detail-user/:id', auth, updateDetailUser);
router.delete('/delete-detail-user/:id', auth, deleteDetailUser);

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth,checkAuth);

module.exports = router;