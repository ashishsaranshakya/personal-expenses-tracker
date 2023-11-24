import React from 'react';
import { dateFormat } from '../../assets/dateTimeFormat';
import { calender, category as categoryIcon, trash, bill } from '../../assets/Icons';
import Button from '../Button';
import { ItemStyled } from '../../styles/Board';

function ExpenseItem({
    id,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor
}) {
    return (
        <ItemStyled indicator={indicatorColor}>
            <div className="content">
                <h5>{description==='' ? 'No description' : description}</h5>
                <div className="inner-content">
                    <div className="details">
                        <div className="text-1">
                            <p>₹ {amount}</p>
                            
                        </div>
                        <div className="text-2">
                            <p>
                                {calender} {dateFormat(date)}
                            </p>
                        </div>
                        <div className="text-3">
                            <p>
                                {categoryIcon} {category}
                            </p>
                        </div>
                    </div>
                    <div className="btn-con">
                        <Button 
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </ItemStyled>
    )
}

export default ExpenseItem