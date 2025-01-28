import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Login, Register} from "../components/Auth";
import {Box, CardMedia, Typography} from "@mui/material";
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
        <Box
            // Outer container to vertically center everything
            minHeight="calc(100vh - 64px)" // adjust if header is 64px tall
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            sx={{
                pt: 8, // Extra top padding to move heading up
                pb: 4,
                px: 2,
            }}
        >
            {/* Heading higher up */}
            <Typography
                variant="h3"
                sx={{
                    mb: 4,
                    fontWeight: 700,
                    textAlign: "center",
                    color: "primary.main", // or your color preference
                }}
            >
                Welcome to Bank of Ido's
            </Typography>

            {/* Row container: form + image */}
            <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent="center"
                alignItems="center" // vertically center the form & image
                gap={8}            // space between the form and the image
                sx={{ maxWidth: 1300, width: "100%" }}
            >
                {/* Left: Form */}
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        maxWidth: 400, // form width
                        width: "100%",
                    }}
                >
                    {view === "Login" ? (
                        <Login setView={handleSetView} onSubmit={handleLoginSubmit} error={error} />
                    ) : (
                        <Register setView={handleSetView} onSubmit={handleRegisterSubmit} error={error} />
                    )}
                </Box>

                {/* Right: Image, larger, horizontally centered */}
                <CardMedia
                    component="img"
                    alt="Bank illustration"
                    image="/bankHeader.jpeg"
                    sx={{
                        width: { xs: "100%", md: 600 }, // bigger image on medium+ screens
                        height: "auto",
                        boxShadow: 3,
                        borderRadius: 1, // small rounding if you like
                    }}
                />
            </Box>
        </Box>
    );

}
export default Home;