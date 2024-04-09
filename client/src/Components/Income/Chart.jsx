import React from 'react';
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Colors
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';

ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Colors
)

function Chart() {
    const { incomeCategories } = useGlobalContext();
    
    const data = {
        labels: incomeCategories ? incomeCategories.categories.map((category) => category.name) : [],
        datasets: [
            {
                label: 'Income',
                data: incomeCategories ? incomeCategories.categories.map((category) => category.amount) : [],
                backgroundColor: ['green','orange','purple','violet','brown','pink','grey','blue','black','red']
            }
        ]
    };

    const options = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    }

    return (
        <ChartStyled>
            <Bar data={data} options={options} />
        </ChartStyled>
    );
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    border-radius: 28px;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
`;

export default Chart