import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button';
import { tick } from '../../assets/Icons';

function AddCategory({ title, type }) {
    const [ name, setName ] = useState("");

    const { addCategory } = useGlobalContext();

    return (
        <StyledCategory>
            <div className="con">
                <h3>{title}</h3>
                <input
                    value={name}
                    name={'name'} 
                    autoComplete="off"
                    placeholder={'Category name'}
                    onChange={e=>setName(e.target.value)}
                    />
                <Button 
                    className="btn"
                    name={'Add Category'}
                    icon={tick}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                    onClick={()=>addCategory(name, type)}
                />
            </div>
        </StyledCategory>
    )
}

const StyledCategory = styled.div`
    background: #FCF6F9;
    display: flex;
    width: 100%;
    border-radius: 20px;
    border: 2px solid #fff;
    padding: .5rem 1rem;

    .con{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(1, auto);
        padding: .5rem 1rem;
        h3{
            grid-column: 1 / 2;
            grid-row: 1 / 2;
            display: flex;
            align-items: center;
        }
        input{
            grid-column: 2 / 3;
            grid-row: 1 / 2;
            display: flex;
            align-items: center;
            width: 15rem;
            margin-right: 2rem;
            padding: .5rem 1rem;
            border-radius: 10px;  
            font-size: 1.4rem;
            color: rgba(34, 34, 96, 1);
            border: 2px solid #78759d;
        }
        .btn{
            grid-column: 3 / 4;
            grid-row: 1 / 2;
            display: flex;
            align-items: center;
        }
    }
`;

export default AddCategory;