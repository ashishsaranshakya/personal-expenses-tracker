import mongoose from 'mongoose';

const IncomeCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    { timestamps: true });

const IncomeCategoriesSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        categories: {
            type: [IncomeCategorySchema]
        }
    },
    { timestamps: true });

const IncomeCategories = mongoose.model('IncomeCategories', IncomeCategoriesSchema);

export default IncomeCategories;