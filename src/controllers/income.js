import Income from '../models/Income.js';
import User from '../models/User.js';
import IncomeCategories from '../models/IncomeCategories.js';
import { createAPIError } from '../utils/APIError.js';
import { validationResult } from 'express-validator';

export const createIncome = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(createAPIError(400, false, "", errors.array()));
        }

        const { amount, date, category: categoryId, description } = req.body;
        if(amount <= 0) return next(createAPIError(400, false, "Amount invalid"));

        const categories = await IncomeCategories.findOne({ userId: req.user.id });
        const category = categories.categories.find(category => category.id === categoryId);
        if (!category) return next(createAPIError(400, false, "Category not found"));

        const newIncome = new Income({
            userId: req.user.id,
            amount,
            date,
            categoryId,
            description
        });
        
        const user = await User.findById(req.user.id);
        user.balance += Number(amount);

        await newIncome.save();
        await user.save();

        res.status(201).json({success: true, message: "Income created successfully."});
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const getIncomes = async (req, res, next) => {
    try {
        const incomes = await Income.find({ userId: req.user.id }, null, { sort: { date: -1 } });
        const { categories } = await IncomeCategories.findOne({ userId: req.user.id });
        const incomesWithCategory = incomes.map(income => {
            const category = categories.find(category => category.id === income.categoryId.toString());
            return { ...income._doc, category: category.name };
        });
        res.status(200).json({ success: true, incomes: incomesWithCategory });
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const getIncomeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const income = await Income.findById(id);
        if (!income) return next(createAPIError(404, false, "Income not found"));
        if (income.userId.toString() !== req.user.id) return next(createAPIError(403, false, "Unauthorized"));
        res.status(200).json({success: true, income});
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const updateIncome = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(createAPIError(400, false, "", errors.array()));
        }

        const { id } = req.params;
        const income = await Income.findById(id);
        if (!income) return next(createAPIError(404, false, "Income not found"));
        if (income.userId.toString() !== req.user.id) return next(createAPIError(403, false, "Unauthorized"));

        const user = await User.findById(req.user.id);
        const { amount, date, categoryId, description } = req.body;
        user.balance -= income.amount;
        user.balance += Number(amount);

        if (amount) income.amount = amount;
        if (date) income.date = date;
        if (categoryId) {
            const categories = await IncomeCategories.findOne({ userId: req.user.id });
            const category = categories.categories.find(category => category.id === categoryId);
            if (!category) return next(createAPIError(400, false, "Category not found"));
            income.categoryId = categoryId;
        }
        if (description) income.description = description;

        await user.save();
        await income.save();

        res.json({success: true, message: "Income updated successfully."});
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const deleteIncome = async (req, res, next) => {
    try {
        const { id } = req.params;
        const income = await Income.findById(id);
        if (!income) return next(createAPIError(404, false, "Expense not found"));
        if (income.userId.toString() !== req.user.id) return next(createAPIError(403, false, "Unauthorized"));
        const user = await User.findById(req.user.id);
        user.balance -= income.amount;

        await user.save();
        await income.deleteOne();
        res.json({ success: true, message: "Income deleted successfully." });
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}