import React, { useState } from 'react';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../context/globalContext';
import { dateFormat } from '../assets/dateTimeFormat';

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const { incomes, expenses } = useGlobalContext();
    
    const [activeTab, setActiveTab] = useState('income'); // State to manage active tab

    const data = {
        datasets: [
            {
                label: 'Income',
                data: incomes.map((income) => ({
                    x: dateFormat(income.date),
                    y: income.amount
                })),
                backgroundColor: 'green',
                tension: 0.2
            },
            {
                label: 'Expense',
                data: expenses.map((expense) => ({
                    x: dateFormat(expense.date),
                    y: expense.amount
                })),
                backgroundColor: 'red',
                tension: 0.2
            }
        ]
    };

    const options = {
        responsive: true
      }

    return (
        <ChartStyled>
            <Tabs>
                <TabButton onClick={() => setActiveTab('income')} active={activeTab === 'income'}>
                    Income
                </TabButton>
                <TabButton onClick={() => setActiveTab('expense')} active={activeTab === 'expense'}>
                    Expense
                </TabButton>
            </Tabs>
            {activeTab === 'income' && (
                <ChartWrapper>
                    <Line data={{...data, datasets: [data.datasets[0]]}} options={options} />
                </ChartWrapper>
            )}
            {activeTab === 'expense' && (
                <ChartWrapper>
                    <Line data={{...data, datasets: [data.datasets[1]]}} />
                </ChartWrapper>
            )}
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    border-radius: 28px;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1.5rem 0rem 0rem 1.5rem;
    height: 100%;
`;

const Tabs = styled.div`
    display: flex;
    gap: 20px;
`;

const TabButton = styled.button`
    padding: 8px 16px;
    border: none;
    background-color: ${({ active }) => (active ? 'lightgray' : 'white')};
    cursor: pointer;
    border-radius: 10px;

    &:hover {
        background-color: lightgray;
    }
`;

const ChartWrapper = styled.div`
    /* Additional styling for chart wrapper if needed */
    //padding: 1rem;
`;

export default Chart