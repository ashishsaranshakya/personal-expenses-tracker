import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Item from './Item';
import { Board } from '../../styles/Board'

function Income() {
    const { getIncomes, getExpenses, deleteIncome, deleteExpense, totalBalance, transactionHistory, incomeCategories, expenseCategories } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);
    const history = transactionHistory();

    return (
        <Board>
            <InnerLayout>
                <h1>Transaction History</h1>
                <h2 className="total-income">Balance: <span>₹ {totalBalance()}</span></h2>
                <div className="income-content">
                    <div className="incomes">
                        {history.map((income) => {
                            const {_id, amount, date, category, categoryId, description, type} = income;
                            return <Item
                                key={_id}
                                id={_id}
                                description={description} 
                                amount={amount} 
                                date={date}
                                categories={type==='income' ? incomeCategories : expenseCategories}
                                category={category} 
                                indicatorColor={type==='income' ? "var(--color-green)" : "red"}
                                deleteItem={type === 'income' ? deleteIncome : deleteExpense}
                                categoryId={categoryId}
                                type={type}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </Board>
    )
}

export default Income