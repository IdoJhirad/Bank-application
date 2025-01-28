import React, {useEffect, useMemo, useState} from "react";

import axios from "axios";
import {Balance} from "../components/AccountComponents";
import { Button, Grid2, Paper, Typography} from "@mui/material";
import "../styles/Dashboard.css"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from "chart.js";
import {Bar, Pie} from "react-chartjs-2";
import {formatNIS} from "../utils/utils";

// Register Chart.js components (necessary with Chart.js v3+)
ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

/**
 * the Dashboard page will contain al the data */
function Dashboard() {
    const name = localStorage.getItem("name");
    const [allTransactions, setAllTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/account/transactions`)
            .then(response => response.data)
            .then(data => {
                setAllTransactions(data.transaction)
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else {
                    setError("Something went wrong. Please try again later.");
                }
            }).finally(() => setLoading(false));
    },[]);

    //filter transaction
    const filteredTransactions = useMemo(() => {
        if (!allTransactions.length) return [];

        const startOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );
        const endOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0,  // day '0' => last day of previous month
            23, 59, 59, 999
        );

        return allTransactions.filter(trx => {
            const trxDate = new Date(trx.timestamp);
            return (trxDate >= startOfMonth && trxDate <= endOfMonth);
        });
    }, [allTransactions, currentDate]);

    const totalIncome = useMemo(()=> {
         return filteredTransactions.filter(trx=> (trx.type==="Deposit") || (trx.type==="Transfer" && trx.receiverName=== name)).reduce((sum,trx)=> sum+trx.amount,0);
    },[filteredTransactions]);

    const totalExpense = useMemo(()=> {
        return filteredTransactions.filter(trx=> (trx.type==="Withdrawal") || (trx.type==="Transfer" && trx.senderName=== name)).reduce((sum,trx)=> sum+trx.amount,0);
    },[filteredTransactions]);

    const depositCount = useMemo(()=> {
        return filteredTransactions.filter(trx => trx.type === "Deposit").length;
        },[filteredTransactions]
    );
    const withdrawCount = useMemo(()=> {
            return filteredTransactions.filter(trx => trx.type === "Withdrawal").length;
        },[filteredTransactions]
    );
    const transferCount = useMemo(()=> {
            return filteredTransactions.filter(trx => trx.type === "Transfer").length;
        },[filteredTransactions]
    );
    function handlePrevMonth() {
        const newDate = new Date(currentDate);
        newDate.setMonth(currentDate.getMonth() - 1);
        setCurrentDate(newDate);
    }

    function handleNextMonth() {
        const nextCandidate = new Date(currentDate);
        nextCandidate.setMonth(currentDate.getMonth() + 1);
        const now = new Date();
        if (
            nextCandidate.getFullYear() > now.getFullYear() ||
            (nextCandidate.getFullYear() === now.getFullYear() &&
                nextCandidate.getMonth() > now.getMonth())
        ) {
            alert("Cannot go beyond the current month!");
            return;
        }
        setCurrentDate(nextCandidate);
    }
    const displayedMonth = currentDate.toLocaleString("default", {
        year: "numeric",
        month: "short",
    });

    if (loading) return <div>Loading transactions...</div>;
    if (error) return <div>Error: {error}</div>;

    const chartColumnData = {
        labels: ["Income", "Expense"],
        datasets: [
            {
                label: "Income vs. Expense",
                data: [totalIncome, totalExpense],
                backgroundColor: ["#4caf50", "#f44336"], // green for income, red for expense
            },
        ],
    };

    const optionsColumnOption = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: {
                display: true,
                text: "Income vs. Expense",
            },
        },
    };

    const pieData = {
        labels: ["Deposits", "Withdrawals", "Transfers"],
        datasets: [
            {
                data: [depositCount, withdrawCount, transferCount],
                backgroundColor: ["#4caf50", "#f44336", "#2196f3"], // green, red, blue
            },
        ],
    };
    const pieOption = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: {
                display: true,
                text: "Transaction Types",
            },
        },
    };
    console.log("Income:", totalIncome, "Expense:", totalExpense);

    return (
        <div className="dashboard-container">
                    <Grid2 item xs={12} md={8}>
                        <Typography  variant="h3" className="dashboard-title">
                            Welcome Back, {name}
                        </Typography>
                    </Grid2>


                <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid2 item xs={12} md={8}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6">
                                Transactions for {displayedMonth}
                            </Typography>
                            <Button variant="outlined" onClick={handlePrevMonth} sx={{ mr: 2 }}>
                                Prev Month
                            </Button>
                            <Button variant="outlined" onClick={handleNextMonth}>
                                Next Month
                            </Button>
                            <MakeTable
                                header=""
                                data={filteredTransactions}
                                tableHeaders={[
                                    "senderName",
                                    "receiverName",
                                    "amount",
                                    "status",
                                    "type",
                                    "timestamp"
                                ]}
                            />

                        </Paper>
                    </Grid2>
                    <Grid2 item xs={12} md={6}>
                        <Grid2 item xs={12} md={4}>
                            <Paper className="chart-placeholder" sx={{ padding: 2 }}>
                                <Balance />
                                <Typography  fontSize={"1.5rem2"} color={totalIncome - totalExpense > 0 ? "green" : "red"}>Monthly flow: {formatNIS(totalIncome-totalExpense)}</Typography>
                            </Paper>
                        </Grid2>
                        <Paper className="chart-placeholder" sx={{ padding: 2 }}>
                            <Bar
                                datasetIdKey="id"
                                data={chartColumnData}
                                options={optionsColumnOption} />
                        </Paper>
                    </Grid2>
                    <Grid2 item xs={12} md={4}>
                        <Paper className="chart-placeholder" sx={{ padding: 2 }}>
                            <Pie data={pieData} options={pieOption} />
                        </Paper>
                    </Grid2>

                </Grid2>
        </div>
    );
}

export default Dashboard;




export function MakeTable({header,tableHeaders,data}){

    return (
        <>
            <Typography variant="h6" gutterBottom>{header}</Typography>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                        <th key={index} style={{ padding: "8px", textAlign: "left", borderBottom: "2px solid #ddd" }}>
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((transaction) => (
                    <tr key={transaction._id} style={{borderBottom: "1px solid #ddd"}}>
                        <td style={{padding: "8px"}}>{transaction.senderName}</td>
                        <td style={{padding: "8px"}}>{transaction.receiverName}</td>
                        <td style={{padding: "8px"}}>{formatNIS(transaction.amount)}</td>
                        <td style={{padding: "8px"}}>{transaction.status}</td>
                        <td style={{padding: "8px"}}>{transaction.type}</td>
                        <td style={{padding: "8px"}}>{new Date(transaction.timestamp).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
