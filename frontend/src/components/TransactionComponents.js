import DynamicForm from "./DynamicForm";
import React, { useState} from "react";

import axios from "axios";

/**
 * Function that encapsulate deposit withdraw and transaction logic using Dynamic form
 */
function TransactionForm({apiURI,setReloadBalance, fields, formTitle, submitText, successMessage}) {
    const [open, setOpen] = useState(false);
    const [statusMessage, setStatusMessage ] = useState(null);

    const handleTransaction = (formData)=> {
        setReloadBalance(null);
        axios.post(apiURI, formData).then(response => {
            if (response.status === 200) {
                setStatusMessage(successMessage);
                setReloadBalance(response.data.balance);
                setOpen(false);
            }
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                setStatusMessage(error.response.data.message);
            } else {
                setStatusMessage("Something went wrong. Please try again later.");
            }
        })
    };
    const handleToggleOpen = () => {
        setOpen(!open);
        setStatusMessage(null);
    };
    return(
        <>
            <button onClick={handleToggleOpen}>{formTitle}</button>
            {open && <DynamicForm onSubmit={handleTransaction} fields={fields} title={formTitle} submitText={submitText} />}
            {statusMessage && <div>{statusMessage}</div>}
        </>
    )
}
export function Transfer({setReloadBalance}){
const fields = [
    { name: "receiverEmail",type: "email", label: "Receiver Email", placeholder:"Receiver Email",required: true },
    { name: "amount", type: "number", label: "Amount", placeholder: "Enter amount", required: true }];

    return (
        <>
            <TransactionForm
                formTitle="Transfer Money"
                fields={fields}
                submitText="Make Transfer"
                apiURI= {`${process.env.REACT_APP_SERVER}/transaction/transfer`}
                setReloadBalance={setReloadBalance}
                successMessage="Transfer successfully."
            />
        </>
    )

}

export function Deposit({setReloadBalance}) {
    const filed = [ { name: "amount", type: "number", label: "Amount", placeholder: "Enter amount", required: true }]
    return (
        <>
            <TransactionForm
                formTitle="Deposit"
                fields={filed}
                submitText="Make Deposit"
                apiURI= {`${process.env.REACT_APP_SERVER}/transaction/deposit`}
                setReloadBalance={setReloadBalance}
                successMessage="Deposit successfully."
            />
        </>

    )
}

export function Withdraw({setReloadBalance}) {
    const filed = [ { name: "amount", type: "number", label: "Amount", placeholder: "Enter amount", required: true }]
    return (
        <>
            <TransactionForm
                formTitle="Withdraw"
                fields={filed}
                submitText="Make Withdraw"
                apiURI= {`${process.env.REACT_APP_SERVER}/transaction/withdraw`}
                setReloadBalance={setReloadBalance}
                successMessage="Withdraw successfully."
            />

        </>
    )
}


