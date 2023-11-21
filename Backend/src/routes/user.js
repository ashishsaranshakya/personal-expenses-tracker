import express from 'express';
import { checkLoggedIn } from '../middlewares/auth.js';
import { getProfile } from '../controllers/user.js'

const router = express.Router();

router.get('/', checkLoggedIn, getProfile);

export default router;