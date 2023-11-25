import ExpenseCategories from "../models/ExpenseCategories.js";
import IncomeCategories from "../models/IncomeCategories.js";
import User from "../models/User.js";
import Expense from "../models/Expense.js";
import Income from "../models/Income.js";
import mongoose from "mongoose";
import { createAPIError } from "../utils/APIError.js";
import { validationResult } from "express-validator";

export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const getCategories = async (req, res, next) => {
    try {
        const expenseCategories = await ExpenseCategories.findOne({ userId: req.user.id });
        const eCategories = await Promise.all(
            expenseCategories.categories.map(async (category) => {
                const expenses = await Expense.find({ userId: req.user.id, categoryId: category._id });
                const amount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
                return { _id: category._id, name: category.name, amount };
            })
        )

        const incomeCategories = await IncomeCategories.findOne({ userId: req.user.id });
        const iCategories = await Promise.all(
            incomeCategories.categories.map(async (category) => {
                const incomes = await Income.find({ userId: req.user.id, categoryId: category.id });
                const amount = incomes.reduce((acc, income) => acc + income.amount, 0);
                return { _id: category._id, name: category.name, amount };
            })
        )

        res.status(200).json({
            success: true,
            expenseCategories: {
                _id: expenseCategories._id,
                userId: expenseCategories.userId,
                categories: eCategories
            },
            incomeCategories: {
                _id: incomeCategories._id,
                userId: incomeCategories.userId,
                categories: iCategories
            }
        });
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const updateBalance = async (req, res, next) => {
    try {
        const balance = req.body.balance;
        const user = await User.findById(req.user.id);
        user.balance = balance;
        const savedBalance = await user.save();
        res.status(200).json({ success: true, balance: savedBalance.balance });
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const deleteIncomeCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const incomeCategories = await IncomeCategories.findOne({ userId: req.user.id });
        const categories = {...incomeCategories.categories};
        incomeCategories.categories = incomeCategories.categories.filter((category) => category._id.toString() !== id);
        if(categories.length === incomeCategories.categories.length){
            return next(createAPIError(404, false, "Category not found"));
        }
        await incomeCategories.save();
        res.status(200).json({ success: true, message: "Category deleted successfully" });
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const deleteExpenseCategory = async (req, res, next) => {
    try {
        const id = req.params.id;
        const expenseCategories = await ExpenseCategories.findOne({ userId: req.user.id });
        const categories = {...expenseCategories.categories};
        expenseCategories.categories = expenseCategories.categories.filter((category) => category._id.toString() !== id);
        if(categories.length === expenseCategories.categories.length){
            return next(createAPIError(404, false, "Category not found"));
        }
        await expenseCategories.save();
        res.status(200).json({ success: true, message: "Category deleted successfully" });
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const addIncomeCategory = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(createAPIError(400, false, "", errors.array()));
        }

        const { name } = req.body;
        const incomeCategories = await IncomeCategories.findOne({ userId: req.user.id });
        incomeCategories.categories.push({
            _id: new mongoose.Types.ObjectId(),
            name
        });
        await incomeCategories.save();
        res.status(200).json({ success: true, message: "Category added successfully" });
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}

export const addExpenseCategory = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return next(createAPIError(400, false, "", errors.array()));
        }

        const { name } = req.body;
        const expenseCategories = await ExpenseCategories.findOne({ userId: req.user.id });
        expenseCategories.categories.push({
            _id: new mongoose.Types.ObjectId(),
            name
        });
        await expenseCategories.save();
        res.status(200).json({ success: true, message: "Category added successfully" });
    }
    catch (error) {
        console.log(error)
        next(createAPIError(500, false, "Server error"));
    }
}