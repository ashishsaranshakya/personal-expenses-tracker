import mongoose from 'mongoose';

const ExpenseCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    { timestamps: true });

const ExpenseCategoriesSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        categories: {
            type: [ExpenseCategorySchema]
        }
    },
    { timestamps: true });

const ExpenseCategories = mongoose.model('ExpenseCategories', ExpenseCategoriesSchema);

export default ExpenseCategories;