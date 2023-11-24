import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from './IncomeForm';
import IncomeItem from './IncomeItem';
import { Board } from '../../styles/Board'

function Income() {
    const { incomes, getIncomes, deleteIncome, totalIncome, incomeCategories } = useGlobalContext();

    useEffect(() =>{
        getIncomes()
    }, [])
    return (
        <Board>
            <InnerLayout>
                <h1>Incomes</h1>
                <h2 className="total-income">Total Income: <span>₹ {totalIncome()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        { incomeCategories && <Form /> }
                    </div>
                    <div className="incomes">
                        {incomes.map((income) => {
                            const {_id, amount, date, category, description} = income;
                            return <IncomeItem
                                key={_id}
                                id={_id}
                                description={description} 
                                amount={amount} 
                                date={date}
                                category={category} 
                                indicatorColor="var(--color-green)"
                                deleteItem={deleteIncome}
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </Board>
    )
}

export default Income