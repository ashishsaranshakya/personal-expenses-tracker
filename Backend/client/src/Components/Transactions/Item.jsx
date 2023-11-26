import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import { dateFormat } from '../../assets/dateTimeFormat';
import { calender, category as categoryIcon, trash, edit, tick, cross } from '../../assets/Icons';
import Button from '../Button';
import { useGlobalContext } from '../../context/globalContext';

function Item({
    id,
    amount,
    date,
    category,
    categoryId,
    description,
    deleteItem,
    indicatorColor,
    categories,
    type
}) {
    const [data, setData] = useState({
        amount,
        date: new Date(date),
        category: categoryId,
        categoryName: category,
        description
    });

    const { updateItem } = useGlobalContext();

    const [deleteEnabled, setDeleteEnabled] = useState(false);
    const [editable, setEditable] = useState(false);
    
    function cancelHandler() {
        setData({
            amount,
            date: new Date(date),
            category: categoryId,
            categoryName: category,
            description,
        })
        setEditable(false);
    }

    const handleInput = name => e => {
        setData({...data, [name]: e.target.value})
    }

    return (
        <ItemStyled indicator={indicatorColor}>
            {editable ?
                (
                    <div className='content'>
                        <h5>
                            <input
                                className='h5' name="description"
                                value={data.description}
                                id="description"
                                onChange={handleInput('description')} />
                        </h5>
                        <div className="inner-content">
                            <div className="details from">
                                <div className="text-1">
                                    ₹ <input
                                        className='text'
                                        name="amount"
                                        value={data.amount}
                                        id="amount"
                                        onChange={handleInput('amount')}
                                    />
                                </div>
                                <div className="text-2">
                                    {calender} <DatePicker 
                                        className='text'
                                        id='date'
                                        showTimeSelect
                                        selected={data.date}
                                        autoComplete="off"
                                        timeFormat="hh:mm aa"
                                        timeIntervals={15}
                                        dateFormat="dd/MM/yyyy hh:mm aa"
                                        onChange={(date) => {
                                            setData({ ...data, date: date })
                                        }}
                                    />
                                </div>
                                <div className="text-3">
                                    {categoryIcon} <select className='text' required value={data.category} name="category" id="category" onChange={handleInput('category')}>
                                        {categories.categories.map((category) => {
                                            return <option key={data.category.id} value={category._id.toString()}>{category.name}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <>
                                <div className="btn-con">
                                    <Button 
                                        icon={cross}
                                        bPad={'1rem'}
                                        bRad={'50%'}
                                        bg={'var(--primary-color'}
                                        color={'#fff'}
                                        iColor={'#fff'}
                                        hColor={'var(--color-green)'}
                                        onClick={() => cancelHandler()}
                                    />
                                </div>
                                <div className="btn-con">
                                    <Button 
                                        icon={tick}
                                        bPad={'1rem'}
                                        bRad={'50%'}
                                        bg={'var(--primary-color'}
                                        color={'#fff'}
                                        iColor={'#fff'}
                                        hColor={'var(--color-green)'}
                                        onClick={() => {
                                            updateItem(id, data, type);
                                            setEditable(false);
                                        }}
                                    />
                                </div>
                            </>
                        </div>
                    </div>
                ) :
                (
                    <div className="content">
                        <h5>{data.description==='' ? 'No description' : data.description}</h5>
                        <div className="inner-content">
                            <div className="details">
                                <div className="text-1">
                                    <p>₹ {data.amount}</p>
                                    
                                </div>
                                <div className="text-2">
                                    <p>
                                        {calender} {dateFormat(data.date)}
                                    </p>
                                </div>
                                <div className="text-3">
                                    <p>
                                        {categoryIcon} {data.categoryName}
                                    </p>
                                </div>
                            </div>
                            <div className="btn-con">
                                <Button 
                                    icon={edit}
                                    bPad={'1rem'}
                                    bRad={'50%'}
                                    bg={'var(--primary-color'}
                                    color={'#fff'}
                                    iColor={'#fff'}
                                    hColor={'var(--color-green)'}
                                    onClick={() => setEditable(true)}
                                />
                            </div>
                            {deleteEnabled ?
                                (
                                    <>
                                        <div className="btn-con">
                                            <Button 
                                                icon={tick}
                                                bPad={'1rem'}
                                                bRad={'50%'}
                                                bg={'var(--primary-color'}
                                                color={'#fff'}
                                                iColor={'#fff'}
                                                hColor={'var(--color-green)'}
                                                onClick={() => deleteItem(id)}
                                            />
                                        </div>
                                        <div className="btn-con">
                                            <Button 
                                                icon={cross}
                                                bPad={'1rem'}
                                                bRad={'50%'}
                                                bg={'var(--primary-color'}
                                                color={'#fff'}
                                                iColor={'#fff'}
                                                hColor={'var(--color-green)'}
                                                onClick={() => setDeleteEnabled(false)}
                                            />
                                        </div>
                                    </>
                                ):
                                (
                                    <div className="btn-con">
                                        <Button 
                                            icon={trash}
                                            bPad={'1rem'}
                                            bRad={'50%'}
                                            bg={'var(--primary-color'}
                                            color={'#fff'}
                                            iColor={'#fff'}
                                            hColor={'var(--color-green)'}
                                            onClick={() => setDeleteEnabled(true)}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )
            }
            
        </ItemStyled>
    )
}

const ItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }

    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        .h5{
            font-size: 1.3rem;
            position: relative;
        }
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
            .text {
                font-size: 1rem;
            }
            .details {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-template-rows: repeat(2, auto);
                gap: 0 1rem;
                .text-1 {
                    grid-column: 1 / 2;
                    grid-row: 1 / 2;
                }
                .text-2 {
                    grid-column: 2 / 3;
                    grid-row: 1 / 2;
                }
                .text-3 {
                    grid-column: 1 / span 2;
                    grid-row: 2 / 3;
                }
            }
        }
    }
`;

export default Item