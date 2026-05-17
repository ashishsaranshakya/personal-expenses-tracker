import express from 'express';
import { googleLogin, googleCallback, logout } from '../controllers/auth.js';
import { checkLoggedIn } from '../middlewares/auth.js';

const router = express.Router();

router.get('/google/callback', googleCallback);
router.get('/google', googleLogin);
router.get('/logout', checkLoggedIn, logout);

export default router;