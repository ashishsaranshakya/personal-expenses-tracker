import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        description: {
            type: String,
            default: ''
        }
    },
    { timestamps: true });

const Income = mongoose.model('Income', IncomeSchema);

export default Income;