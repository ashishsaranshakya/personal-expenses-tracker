import ExpenseCategories from "../models/ExpenseCategories.js";
import IncomeCategories from "../models/IncomeCategories.js";
import User from "../models/User.js";

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
        const incomeCategories = await IncomeCategories.findOne({ userId: req.user.id });
        res.status(200).json({ success: true, expenseCategories, incomeCategories });
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