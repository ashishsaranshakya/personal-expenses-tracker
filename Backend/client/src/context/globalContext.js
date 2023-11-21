import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({children}) => {

    const [loggedIn, setLoggedIn] = useState(false);
    const [profile, setProfile] = useState(null);
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);

    //auth
    const getProfile = async () => {
        await axios.get(`${BASE_URL}user`)
            .then((res) => {
                if (res.data.success) {
                    setLoggedIn(true);
                    setProfile(res.data.user);
                }
            })
            .catch((err) => {
                setError(err.response.data.error)
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

    //calculate incomes
    const addIncome = async (income) => {
        await axios.post(`${BASE_URL}incomes`, income)
            .catch((err) => {
                setError(err.response.data.error)
            });
        getProfile();
        getIncomes();
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}incomes`);
        setIncomes(response.data.incomes);
        console.log(response.data);
    }

    const deleteIncome = async (id) => {
        await axios.delete(`${BASE_URL}incomes/${id}`);
        getProfile();
        getIncomes();
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
            .catch((err) => {
                setError(err.response.data.error)
            });
        getProfile();
        getExpenses();
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}expenses`)
        setExpenses(response.data.expenses)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        await axios.delete(`${BASE_URL}expenses/${id}`);
        getProfile();
        getExpenses()
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

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.date) - new Date(a.date)
        })

        return history.slice(0, 3) //TODO change this, dont know what this does
    }


    return (
        <GlobalContext.Provider value={{
            profile,
            loggedIn,
            getProfile,
            login,
            logout,
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