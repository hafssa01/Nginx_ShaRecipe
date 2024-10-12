import express from 'express';
const router = express.Router();
import UserController from '../controllers/UserController.js'; // Adjust this import as necessary

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
