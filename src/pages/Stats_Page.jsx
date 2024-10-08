import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpensePieChart from '../components/ExpensePie';
import MonthlyExpenseChart from '../components/ExpenseBar';
import Statistics from "../components/Statistics";
import moment from "moment"

const Stats_Page = () => {
    const [data, setdata] = useState([]);
    const [catArray, setCatArray] = useState([0, 0, 0, 0]);
    const [monthArray, setMonthArray] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [loading,setLoading]=useState(false)

    

  
    const fetchLeaderboard = async () => {
        try {
            const userToken = localStorage.getItem("token");
            const res = await axios.get("https://spend-wise-backend-psi.vercel.app/expenses/getLeaderboard", { headers: { "Authorization": userToken } });
            setdata(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchStats = async () => {
        try {
            const userToken = localStorage.getItem("token");
            const res = await axios.post("https://spend-wise-backend-psi.vercel.app/expenses/getExpensesByCategory",{}, { headers: { "Authorization": userToken } });
            console.log("The data of stats is ", res.data);
            setCatArray(res.data)
            
            console.log("grouped by category ", catArray);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchYearlyStats=async()=>{
    try {
        const userToken = localStorage.getItem("token");
        const res = await axios.post("https://spend-wise-backend-psi.vercel.app/expenses/getYearlyExpenses",{}, { headers: { "Authorization": userToken } });
        console.log("The data of stats is ", res.data);
        setMonthArray(res.data)
    } catch (error) {
        console.log(error)
    }
    }

    useEffect(() => {
        setLoading(true)
        fetchLeaderboard();
        fetchStats();
        fetchYearlyStats()
        setLoading(false)
    }, []);
     {loading && <span>Loading...</span>}
    return (
        <div className='flex flex-col items-start justify-center p-4'>
            <div className='w-full p-4'>
                <h2 className='text-xl mb-4'>Leaderboard</h2>
                <div className='space-y-4'>
                    {data.map((user) => (
                        <Statistics key={user.email} user={user.email} expense={user.totalExpenses} />
                    ))}
                </div>
            </div>
            <div className='flex sm:gap-6 xs:flex-col sm:flex-row justify-center items-center w-full p-4 gap-2'>
                <div className='bg-white shadow-md p-4 '>
                    <h2 className='text-xl mb-4 text-center'>Expense Categories</h2>
                    <ExpensePieChart expenseData={catArray} />
                </div>
                <div className='bg-white shadow-md p-4'>
                    <h2 className='text-xl mb-4 text-center'>Monthly Expenses</h2>
                    <MonthlyExpenseChart monthdata={monthArray} />
                </div>
            </div>
        </div>
    );
}

export default Stats_Page;
