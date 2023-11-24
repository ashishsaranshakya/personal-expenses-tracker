import express from 'express';
import { checkLoggedIn } from '../middlewares/auth.js';
import { getProfile, getCategories, updateBalance } from '../controllers/user.js'

const router = express.Router();

router.get('/', checkLoggedIn, getProfile);
router.put('/', checkLoggedIn, updateBalance);
router.get('/categories', checkLoggedIn, getCategories);

export default router;