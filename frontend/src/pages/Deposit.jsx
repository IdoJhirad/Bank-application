import React from "react";
import {TransactionForm} from '../components/TransactionComponents'
function Deposit() {
    const filed = [ { name: "amount", type: "number", label: "Amount", placeholder: "Enter amount", required: true }]
    return (
        <div className="center-wrapper">
            <TransactionForm
                formTitle="Deposit"
                fields={filed}
                submitText="Make Deposit"
                apiURI= {`${process.env.REACT_APP_SERVER}/transaction/deposit`}
                successMessage="Deposit successfully."
            />
        </div>

    )
}


export default Deposit;