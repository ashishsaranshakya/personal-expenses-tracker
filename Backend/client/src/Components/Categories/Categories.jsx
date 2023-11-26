import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import DeleteCategory from './DeleteCategory';
import AddCategory from './AddCategory';

function Income() {
    const { incomeCategories, expenseCategories } = useGlobalContext();

    return (
        <StyledCategories>
                <h1>Category Settings</h1>
                <div className="category">
                    {incomeCategories && <DeleteCategory title="Income Category" categories={incomeCategories.categories} type="income" />}
                    <AddCategory title="Income Category" type="income"  />
                    {expenseCategories && <DeleteCategory title="Expense Category" categories={expenseCategories.categories} type="expense" />}
                    <AddCategory title="Expense Category" type="expense"  />
                </div>
        </StyledCategories>
    )
}

const StyledCategories = styled.div`
    padding: 0 0.5rem;
    width: 70%;
    overflow: auto;
    .category{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        margin-top: 2rem;
    }
`;

export default Income