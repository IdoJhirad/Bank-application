import React from "react";
import DynamicForm from "../components/DynamicForm";

export function Login({setView, onSubmit}) {
    const loginFields = [
        { name :"email", type:"email", placeholder:"Enter Your Email", label: "Email", required: true },
        { name:"password", type:"password", placeholder:"Enter your password", label: "Password", required: true }
    ]

    return (
        <>
            <DynamicForm onSubmit={onSubmit} fields={loginFields} submitText="Login" title="Login to your account" />
            <button onClick={()=>setView("Register")}>Dont have an account </button>
        </>
    );
}

export function Register({setView, onSubmit}) {
    const registerFields = [
        { name: "name", type: "text", label: "Name", placeholder: "Enter your name", required: true },
        { name: "phone", type: "tel", label: "Phone Number", placeholder: "Enter your phone number", required: true },
        { name: "email", type: "email", label: "Email", placeholder: "Enter your email", required: true },
        { name: "password", type: "password", label: "Password", placeholder: "Enter your password", required: true },
    ]

    return (
        <>
            <DynamicForm onSubmit={onSubmit} fields={registerFields} submitText="Register" title="Welcome to register page" />
            <button onClick={()=>setView("Login")}>Login</button>
        </>
    );
}

export function Logout({onLogout}) {
   return (
       <>
           <button onClick={onLogout}>Logout</button>
       </>
   )
}