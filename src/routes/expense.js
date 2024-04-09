import express from 'express';
import {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense
} from '../controllers/expense.js';
import { checkLoggedIn } from '../middlewares/auth.js';
import { expenseValidator, updateExpenseValidator } from '../middlewares/expenseValidator.js';

const router = express.Router();

router.post('/', [checkLoggedIn, expenseValidator], createExpense);
router.get('/', checkLoggedIn, getExpenses);
router.get('/:id', checkLoggedIn, getExpenseById);
router.put('/:id', [checkLoggedIn, updateExpenseValidator], updateExpense);
router.delete('/:id', checkLoggedIn, deleteExpense);

export default router;