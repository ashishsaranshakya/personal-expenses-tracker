import express from 'express';
import { checkLoggedIn } from '../middlewares/auth.js';
import {
    getProfile,
    getCategories,
    updateBalance,
    deleteIncomeCategory,
    deleteExpenseCategory,
    addIncomeCategory,
    addExpenseCategory
} from '../controllers/user.js';
import { expenseCategoryValidator } from '../middlewares/expenseValidator.js';
import { incomeCategoryValidator } from '../middlewares/incomeValidator.js';

const router = express.Router();

router.get('/', checkLoggedIn, getProfile);
router.put('/', checkLoggedIn, updateBalance);
router.get('/categories', checkLoggedIn, getCategories);
router.post('/categories/income', [checkLoggedIn, incomeCategoryValidator], addIncomeCategory);
router.post('/categories/expense', [checkLoggedIn, expenseCategoryValidator], addExpenseCategory);
router.delete('/categories/income/:id', checkLoggedIn, deleteIncomeCategory);
router.delete('/categories/expense/:id', checkLoggedIn, deleteExpenseCategory);

export default router;