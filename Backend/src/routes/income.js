import express from 'express';
import {
    createIncome,
    getIncomes,
    getIncomeById,
    updateIncome,
    deleteIncome
} from '../controllers/income.js';
import { checkLoggedIn } from '../middlewares/auth.js';
import { incomeValidator, updateIncomeValidator } from '../middlewares/incomeValidator.js';

const router = express.Router();

router.post('/', [checkLoggedIn, incomeValidator], createIncome);
router.get('/', checkLoggedIn, getIncomes);
router.get('/:id', checkLoggedIn, getIncomeById);
router.put('/:id', [checkLoggedIn, updateIncomeValidator], updateIncome);
router.delete('/:id', checkLoggedIn, deleteIncome);

export default router;