import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from './ExpenseForm';
import ExpenseItem from './ExpenseItem';
import { Board } from '../../styles/Board'

function Expense() {
    const { expenses, getExpenses, deleteExpense, totalExpenses, expenseCategories } = useGlobalContext();

    useEffect(() =>{
        getExpenses()
    }, [])
    return (
        <Board>
            <InnerLayout>
                <h1>Expense</h1>
                <h2 className="total-income">Total Expense: <span>₹ {totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        { expenseCategories && <Form /> }
                    </div>
                    <div className="incomes">
                        {expenses.map((expense) => {
                            const {_id, amount, date, category, description} = expense;
                            return <ExpenseItem
                                key={_id}
                                id={_id}
                                description={description} 
                                amount={amount} 
                                date={date}
                                category={category}
                                indicatorColor="red"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </Board>
    )
}

export default Expense