import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Register} from "../components/Auth";
import {Login} from "../components/Auth";
import {Alert, Box, Typography} from "@mui/material";
axios.defaults.withCredentials = true;



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
                localStorage.setItem("name", response.data.name);
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
            
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="50vh"
                sx={{ marginTop: 20}}
            >
                <Typography
                    textAlign="center"
                    variant="h4"
                    sx={{ marginBottom: 2 }}
                >
                    Welcome to Bank of Ido's
                </Typography>
                {view === "Login" ? (
                    <Login setView={handleSetView} onSubmit={handleLoginSubmit} error={error} />
                ) : (
                    <Register setView={handleSetView} onSubmit={handleRegisterSubmit} error={error} />
                )}
            </Box>
        </>
    );
}

export default Home;