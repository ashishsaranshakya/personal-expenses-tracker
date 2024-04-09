import mongoose from "mongoose";
import ExpenseCategory from "./ExpenseCategories.js";

const ExpenseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        description: {
            type: String,
            default: ''
        }
    },
    { timestamps: true });

const Expense = mongoose.model('Expense', ExpenseSchema);

export default Expense;