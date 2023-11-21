import { body } from "express-validator";

export const expenseValidator = [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('date').optional().isISO8601().toDate().withMessage('Date must be a valid date'),
    body('categoryId').notEmpty().withMessage('Category must be specified'),
    body('description').optional().isLength({ max: 50 }).withMessage('Description cannot be more than 50 characters long'),
    body('paymentMethod').optional().isLength({ max: 20 }).withMessage('Payment method cannot be more than 20 characters long')
];

export const updateExpenseValidator = [
    body('amount').optional().isNumeric().withMessage('Amount must be a number'),
    body('date').optional().isDate().withMessage('Date must be a valid date'),
    body('categoryId').optional().notEmpty().withMessage('Category must be specified'),
    body('description').optional().isLength({ max: 50 }).withMessage('Description cannot be more than 50 characters long'),
    body('paymentMethod').optional().isLength({ max: 20 }).withMessage('Payment method cannot be more than 20 characters long')
];

export const expenseCategoryValidator = [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
];
