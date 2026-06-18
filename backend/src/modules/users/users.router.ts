import { Router } from 'express';
import { deleteUser, getAllUsers, registerUser, updateUser, getUser } from './users.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', authMiddleware, getAllUsers);
router.get('/:id', authMiddleware, getUser)
router.post('/', registerUser);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export { router as usersRouter };