import React, { useState } from 'react';
import { dateFormat } from '../../assets/dateTimeFormat';
import { calender, category as categoryIcon, trash, tick, cross } from '../../assets/Icons';
import Button from '../Button';
import { ItemStyled } from '../../styles/Board';

function IncomeItem({
    id,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor
}) {
    const [deleteEnabled, setDeleteEnabled] = useState(false);

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
        </ItemStyled>
    )
}

export default IncomeItem