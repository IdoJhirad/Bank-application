import React from "react";
import {TransactionForm} from '../components/TransactionComponents'
 function Transfer(){
    const fields = [
        { name: "receiverEmail",type: "email", label: "Receiver Email", placeholder:"Receiver Email",required: true },
        { name: "amount", type: "number", label: "Amount", placeholder: "Enter amount", required: true }];

    return (
        <div className="center-wrapper">
            <TransactionForm
                formTitle="Transfer Money"
                fields={fields}
                submitText="Make Transfer"
                apiURI= {`${process.env.REACT_APP_SERVER}/transaction/transfer`}
                successMessage="Transfer successfully."
            />
        </div>
    )

}
export default  Transfer;