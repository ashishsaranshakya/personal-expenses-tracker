import Expense from '../models/Expense.js';
import User from '../models/User.js';
import ExpenseCategories from '../models/ExpenseCategories.js';
import { createAPIError } from '../utils/APIError.js';
import { validationResult } from 'express-validator';

export const createExpense = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(createAPIError(400, false, "", errors.array()));
        }

        const { amount, date, category: categoryId, description } = req.body;
        if(amount <= 0) return next(createAPIError(400, false, "Amount invalid"));

        const categories = await ExpenseCategories.findOne({ userId: req.user.id });
        const category = categories.categories.find(category => category.id === categoryId);
        if (!category) return next(createAPIError(400, false, "Category not found"));

        const newExpense = new Expense({
            userId: req.user.id,
            amount,
            date,
            categoryId,
            description
        });
        
        const user = await User.findById(req.user.id);
        user.balance -= amount;

        await newExpense.save();
        await user.save();

        res.status(201).json({success: true, message: "Expense created successfully."});
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const getExpenses = async (req, res, next) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }, null, { sort: { date: -1 } });
        const { categories } = await ExpenseCategories.findOne({ userId: req.user.id });
        const expensesWithCategory = expenses.map(expense => {
            const category = categories.find(category => category.id === expense.categoryId.toString());
            return { ...expense._doc, category: category.name };
        });
        res.status(200).json({ success: true, expenses: expensesWithCategory });
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const getExpenseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findById(id);
        if (!expense) return next(createAPIError(404, false, "Expense not found"));
        if (expense.userId.toString() !== req.user.id) return next(createAPIError(403, false, "Unauthorized"));
        res.status(200).json({success: true, expense});
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const updateExpense = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(createAPIError(400, false, "", errors.array()));
        }

        const { id } = req.params;
        const expense = await Expense.findById(id);
        if (!expense) return next(createAPIError(404, false, "Expense not found"));
        if (expense.userId.toString() !== req.user.id) return next(createAPIError(403, false, "Unauthorized"));

        const user = await User.findById(req.user.id);
        const { amount, date, categoryId, description } = req.body;
        user.balance += expense.amount;
        user.balance -= amount;

        if (amount) expense.amount = amount;
        if (date) expense.date = date;
        if (categoryId) {
            const categories = await ExpenseCategories.findOne({ userId: req.user.id });
            const category = categories.categories.find(category => category.id === categoryId);
            if (!category) return next(createAPIError(400, false, "Category not found"));
            expense.categoryId = categoryId;
        }
        if (description) expense.description = description;

        await user.save();
        await expense.save();

        res.json({success: true, message: "Expense updated successfully."});
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const deleteExpense = async (req, res, next) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findById(id);
        if (!expense) return next(createAPIError(404, false, "Expense not found"));
        if (expense.userId.toString() !== req.user.id) return next(createAPIError(403, false, "Unauthorized"));
        const user = await User.findById(req.user.id);
        user.balance += expense.amount;

        await user.save();
        await expense.deleteOne();
        res.json({ success: true, message: "Expense deleted successfully." });
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}