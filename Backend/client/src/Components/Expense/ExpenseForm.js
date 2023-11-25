import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button';
import { tick as plus, cross } from '../../assets/Icons';
import { FormStyled } from '../../styles/Board';

function Form({cancelHandler}) {
    const {addExpense, error, setError, expenseCategories} = useGlobalContext()
    const [inputState, setInputState] = useState({
        amount: null,
        date: null,
        category: expenseCategories.categories[0]._id.toString(),
        description: '',
    })

    const { amount, date, category,description } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = e => {
        e.preventDefault()
        addExpense({ ...inputState, amount: Number(inputState.amount) })
        setInputState({
            amount: null,
            date: null,
            category: expenseCategories.categories[0]._id.toString(),
            description: '',
        });
        cancelHandler();
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div className="input-control">
                <input value={amount}  
                    type="number" 
                    name={'amount'} 
                    autoComplete="off"
                    placeholder={'Expense Amount'}
                    onChange={handleInput('amount')} 
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    showTimeSelect
                    placeholderText='Enter A Date'
                    selected={date}
                    autoComplete="off"
                    timeFormat="hh:mm aa"
                    timeIntervals={15}
                    dateFormat="dd/MM/yyyy hh:mm aa"
                    onChange={(date) => {
                        setInputState({...inputState, date: date})
                    }}
                />
            </div>
            <div className="selects input-control">
                <select required value={category} name="category" id="category" onChange={handleInput('category')}>
                    {expenseCategories && expenseCategories.categories.map((category) => {
                        return <option key={category.id} value={category._id.toString()}>{category.name}</option>
                        })
                    }
                </select>
            </div>
            <div className="input-control">
                <textarea name="description" value={description} placeholder='Add A Description' id="description" cols="30" rows="2" onChange={handleInput('description')}></textarea>
            </div>
            <div className='bottom'>
                <div className="submit-btn">
                    <Button 
                        name={'Add Expense'}
                        icon={plus}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'var(--color-accent'}
                        color={'#fff'}
                    />
                </div>
                <div className="btn">
                    <Button
                        name={'Cancel'}
                        icon={cross}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                        iColor={'#fff'}
                        hColor={'var(--color-green)'}
                        onClick={cancelHandler}
                    />
                </div>
            </div>
        </FormStyled>
    )
}

export default Form