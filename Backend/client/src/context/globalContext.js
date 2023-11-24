import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [profile, setProfile] = useState(null);
    const [incomes, setIncomes] = useState([]);
    const [incomeCategories, setIncomeCategories] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState(null);
    const [error, setError] = useState(null);

    //auth
    const getProfile = async () => {
        await axios.get(`${BASE_URL}user`)
            .then((res) => {
                if (res.data.success) {
                    setLoggedIn(true);
                    setProfile(res.data.user);
                    getCategories();
                }
            })
            .catch((err) => {
                setError(err.response.data.error)
            });
    }

    const updateBalance = async (balance) => {
        await axios.put(`${BASE_URL}user`, {balance})
            .then((res) => {
                if (res.data.success) {
                    setProfile({...profile, balance: res.data.balance});
                }
            })
            .catch((err) => {
                setError(err.response.data.error || err.response.data.errors)
            });
    }

    const login = async () => {
        window.location.href = `${BASE_URL}auth/google`;
    }

    const logout = async () => {
        await axios.get(`${BASE_URL}auth/logout`)
            .then((res) => {
                if (res.data.success) {
                    setLoggedIn(false);
                    setProfile(null);
                    setIncomes([]);
                    setExpenses([]);
                }
            })
            .catch((err) => {
                setError(err.response.data.error)
            });
    }

    //categories
    const getCategories = async () => {
        await axios.get(`${BASE_URL}user/categories`)
            .then((res) => {
                if (res.data.success) {
                    setIncomeCategories(res.data.incomeCategories);
                    setExpenseCategories(res.data.expenseCategories);
                }
            })
            .catch((err) => {
                setError(err.response.data.error)
            });
    }

    //calculate incomes
    const addIncome = async (income) => {
        await axios.post(`${BASE_URL}incomes`, income)
            .then((res) => {
                getProfile();
                getIncomes();
            })
            .catch((err) => {
                setError(err.response.data.error)
            });
    }

    const getIncomes = async () => {
        await axios.get(`${BASE_URL}incomes`)
            .then((response) => {
                const incomes = response.data.incomes.map((income) => {
                    return { ...income, type: 'income' }
                })
                setIncomes(incomes);
            })
            .catch((err) => {
                setError(err.response.data.error)
            });
    }

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}incomes/${id}`)
            .then((res) => {
                getProfile();
                getIncomes();
            })
            .catch((err) => {
                setError(err.response.data.error)
            });
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome = totalIncome + income.amount
        });

        return totalIncome;
    }


    //calculate incomes
    const addExpense = async (expense) => {
        await axios.post(`${BASE_URL}expenses`, expense)
            .then((res) => {
                getProfile();
                getExpenses();
            })
            .catch((err) => {
                setError(err.response.data.error)
            });
    }

    const getExpenses = async () => {
        await axios.get(`${BASE_URL}expenses`)
            .then((response) => {
                const expenses = response.data.expenses.map((expense) => {
                    return {...expense, type: 'expense'}
                })
                setExpenses(expenses)
            })
            .catch((err) => {
                setError(err.response.data.error)
            });
    }

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}expenses/${id}`)
            .then((res) => {
                getProfile();
                getExpenses();
            })
            .catch((err) => {
                setError(err.response.data.error)
            });
    }

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) =>{
            totalExpense = totalExpense + expense.amount
        })

        return totalExpense;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = (limit) => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })
        if (limit) {
            return history.slice(0, limit)
        }
        return history;
    }


    return (
        <GlobalContext.Provider value={{
            profile,
            loggedIn,
            getProfile,
            updateBalance,
            login,
            logout,
            incomeCategories,
            expenseCategories,
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            expenses,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}