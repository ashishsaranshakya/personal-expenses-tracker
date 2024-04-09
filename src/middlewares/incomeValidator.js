import { body } from "express-validator";

export const incomeValidator = [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('date').optional().isISO8601().toDate().withMessage('Date must be a valid date'),
    body('category').notEmpty().withMessage('Category must be specified'),
    body('description').optional().isLength({ max: 50 }).withMessage('Description cannot be more than 50 characters long')
];

export const updateIncomeValidator = [
    body('amount').optional().isNumeric().withMessage('Amount must be a number'),
    body('date').optional().isISO8601().withMessage('Date must be a valid date'),
    body('category').optional().notEmpty().withMessage('Category must be specified'),
    body('description').optional().isLength({ max: 50 }).withMessage('Description cannot be more than 50 characters long')
];

export const incomeCategoryValidator = [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
];
