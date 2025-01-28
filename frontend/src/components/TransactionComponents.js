// TransactionForm.jsx
import React, { useState } from "react";
import axios from "axios";
import {Alert, Button, Typography} from "@mui/material";
import DynamicForm from "./DynamicForm";
import { MakeTable } from "../pages/dashboard";
import "../styles/TransactionForm.css";
import {useNavigate} from "react-router-dom"; // <-- Import our new CSS

export function TransactionForm({
                                    apiURI,
                                    fields,
                                    formTitle,
                                    submitText,
                                    successMessage
                                }) {
    const [open, setOpen] = useState(true);
    const [statusMessage, setStatusMessage] = useState(null);
    const [error, setError] = useState(null);
    const [transaction, setTransaction] = useState();
    const tableHeaders = ["senderName", "receiverName", "amount", "status", "type"];
    const navigate = useNavigate();

    const handleTransaction = (formData) => {
        axios.post(apiURI, formData).then((response) => {
            if (response.status === 200) {
                setStatusMessage(successMessage);
                setTransaction([response.data.transaction]);
                setOpen(false);
            }
        }).catch((err) => {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong. Please try again later.");
            }
        });
    };

    return (
        <div className="transaction-container">
            {open && (
                <DynamicForm
                    onSubmit={handleTransaction}
                    fields={fields}
                    title={formTitle}
                    submitText={submitText}
                />
            )}
            {error && <Alert severity="error">{error}</Alert>}

            {statusMessage && (
                <>
                    <Typography className="transaction-title">
                        {formTitle} Complete
                    </Typography>
                    <div>
                        <MakeTable
                            header=""
                            data={transaction}
                            tableHeaders={tableHeaders}
                            tableClass="transaction-table"
                        />
                    </div>
                    <Button
                        variant="contained"
                        sx={{ mt: 2, textTransform: "none" }}
                        onClick={() => navigate("/dashboard")}
                    >
                        Return to Dashboard
                    </Button>
                </>
            )}
        </div>
    );
}
