import React, {useEffect, useState} from "react";
import {Logout} from "../components/Auth";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Transfer,Withdraw, Deposit} from "../components/TransactionComponents";
import {Balance} from "../components/AccountComponents";

/**
 * the Dashboard page will contain al the data */
function Dashboard() {

    const navigate = useNavigate();

    const [reloadBalance, setReloadBalance] = useState(false);

    const handleLogout =  () => {
            localStorage.removeItem("name");
             axios.post(`${process.env.REACT_APP_SERVER}/auth/logout`, {}).then(response => {
                 navigate("/");
             })
    };


    return (
        <>
            <Logout onLogout={handleLogout} />
            <h1>Welcome Back {localStorage.getItem("name")}</h1>
            <Balance  reloadBalance={reloadBalance} setReloadBalance={setReloadBalance} />
            <Deposit setReloadBalance={setReloadBalance}   />
            <Withdraw setReloadBalance={setReloadBalance}  />
            <Transfer setReloadBalance={setReloadBalance}  />
            <Transaction/>
        </>

    )
}

export default Dashboard;




function Transaction(){
    const tableHeaders = ["senderName","receiverName","amount","status","type"];
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/account/transactions`)
            .then(response => response.data)
            .then(data => {
                setData(data.transaction)
            })
            .catch(err => {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        }).finally(() => setLoading(false));
    },[]);

    if(error){
        return <div>Error: {error}</div>
    }

    return (
        loading ?(<div>Loading...</div>): <MakeTable header="Treansaction" data={data} tableHeaders={tableHeaders}/>
    )
}

function MakeTable({header,tableHeaders,data}){
    return (
    <>
        <h1>{header}</h1>

        <table>
            <thead>
            <tr>
            {tableHeaders.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
                {data.map(transaction => (
                    <tr key={transaction._id}>
                        <td>{transaction.senderName}</td>
                        <td>{transaction.receiverName}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.status}</td>
                        <td>{transaction.type}</td>
                    </tr>
                ))}
            </tbody>
            </table>
    </>
    )
}
