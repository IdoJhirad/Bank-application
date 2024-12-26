import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

axios.defaults.withCredentials = true;
function DynamicForm({fields ,onSubmit, title, submitText}) {
    const [formData, setFormData] = useState(
        //initialize the fields of form data to empty string
        fields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        },{})
    );
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <>
            <h1>{title}</h1>
            <form onSubmit={handleSubmit}>
                {fields.map((field) => (
                    <div key={field.name}>
                        <label>{field.label}</label>
                        <input type={field.type}
                               name={field.name}
                               placeholder={field.placeholder}
                               value={formData[field.name]}
                               onChange={handleChange}
                               required={field.required}
                               />
                    </div>
                ))}
                <button type="submit">{submitText}</button>
            </form>
        </>
    )

}

function Home() {
    const [view, setView] = useState("Login");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    function handleSetView(newView) {
        setView(newView);
    }
    const handleRegisterSubmit = (formData) => {
        //TODo 1 send to the api get move to log in
        axios.post(`${process.env.REACT_APP_SERVER}/auth/register`, formData).then(response => {
            if(response.status === 201) {
                setView("Login");
            }
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected server error occurred.");
            }
        });
    }
    const handleLoginSubmit = (formData) =>{
        //Todo move to dash bored with cookie
        axios.post(`${process.env.REACT_APP_SERVER}/auth/login`, formData).then(response => {
            if(response.status === 200) {
                navigate("/dashboard", {state : response.data});
            }
        }).catch(error => {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected server error occurred.");
            }
        })
    }

    return (
        <>
            {view === "Login" ? <Login setView={handleSetView} onSubmit={handleLoginSubmit}/> : <Register setView={handleSetView} onSubmit={handleRegisterSubmit} />}
            {error && <div >{error}</div>}
        </>
    );
}
function Register({setView, onSubmit}) {
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

function Login({setView, onSubmit}) {
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



export default Home;