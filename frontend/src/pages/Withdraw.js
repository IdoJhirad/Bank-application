import React from "react";
import {TransactionForm} from '../components/TransactionComponents'
 function Withdraw() {
    const filed = [ { name: "amount", type: "number", label: "Amount", placeholder: "Enter amount", required: true }]
    return (
        <div className="center-wrapper">
            <TransactionForm
                formTitle="Withdraw"
                fields={filed}
                submitText="Make Withdraw"
                apiURI= {`${process.env.REACT_APP_SERVER}/transaction/withdraw`}
                successMessage="Withdraw successfully."
            />

        </div>
    )
}
export default Withdraw;