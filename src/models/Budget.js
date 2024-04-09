import mongoose from 'mongoose';

const BudgetSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    }, { timestamps: true });

const Budget = mongoose.model('Budget', BudgetSchema);

export default Budget;