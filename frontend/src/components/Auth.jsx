import React from "react";
import DynamicForm from "../components/DynamicForm";
import {Alert, Box, Button, } from "@mui/material";

export function Login({setView, onSubmit, error}) {
    const loginFields = [
        { name :"email", type:"email", placeholder:"Enter Your Email", label: "Email", required: true },
        { name:"password", type:"password", placeholder:"Enter your password", label: "Password", required: true }
    ]

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <DynamicForm onSubmit={onSubmit} fields={loginFields} submitText="Login" title="Login to your account" />
            {error && <Alert severity="error" sx={{ mt: 2, width: "100%", maxWidth: 400 }}>{error}</Alert>}
            <Button onClick={() => setView("Register")} sx={{ mt: 2 }}>
                Don't have an account? Register
            </Button>
        </Box>
    );

}

export function Register({setView, onSubmit, error}) {
    const registerFields = [
        { name: "name", type: "text", label: "Name", placeholder: "Enter your name", required: true },
        { name: "phone", type: "tel", label: "Phone Number", placeholder: "Enter your phone number", required: true },
        { name: "email", type: "email", label: "Email", placeholder: "Enter your email", required: true },
        { name: "password", type: "password", label: "Password", placeholder: "Enter your password", required: true },
    ]

    return (
        <Box display="flex" flexDirection="column" alignItems="center">

            <DynamicForm onSubmit={onSubmit} fields={registerFields} submitText="Register" title="Welcome to Register Page" />
            {error && <Alert severity="error" sx={{ mt: 2, width: "100%", maxWidth: 400 }}>{error}</Alert>}
            <Button onClick={() => setView("Login")} sx={{ mt: 2 }}>
                Already have an account? Login
            </Button>
        </Box>
    );
}

