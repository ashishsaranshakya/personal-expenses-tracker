import { dashboard, expenses, transactions, trend, category } from '../../assets/Icons';

export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: dashboard,
        link: '/'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: transactions,
        link: "/transactions",
    },
    {
        id: 3,
        title: "Incomes",
        icon: trend,
        link: "/incomes",
    },
    {
        id: 4,
        title: "Expenses",
        icon: expenses,
        link: "/expenses",
    },
    {
        id: 5,
        title: "Category Settings",
        icon: category,
        link: "/categories",
    }
]