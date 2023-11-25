import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from './ExpenseForm';
import ExpenseItem from './ExpenseItem';
import { Board } from '../../styles/Board'
import Button from '../Button';
import { plus } from '../../assets/Icons';
import Chart from './Chart';

function Expense() {
    const { expenses, getExpenses, deleteExpense, totalExpenses, expenseCategories } = useGlobalContext();

    const [formEnabled, setFormEnabled] = useState(false);
    useEffect(() => {
        getExpenses()
    }, []);

    return (
        <Board>
            <InnerLayout>
                <h1>Expense</h1>
                <h2 className="total-income">Total Expense: <span>₹ {totalExpenses()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        {formEnabled ?
                                <>
                                    <div className='form-con'>
                                        {expenseCategories && <Form cancelHandler={() => setFormEnabled(false)} />}
                                    </div>
                                </>
                            :
                                <>
                                    <div className='chart-con'>
                                        <Chart />
                                        <Button
                                            icon={plus}
                                            bPad={'1rem'}
                                            bRad={'50%'}
                                            bg={'var(--primary-color'}
                                            color={'#fff'}
                                            iColor={'#fff'}
                                            hColor={'var(--color-green)'}
                                            onClick={() => setFormEnabled(true)}
                                        />
                                    </div>
                                </>
                        }
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