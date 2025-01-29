// Header.jsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import {Button, FormControlLabel, Switch, useColorScheme} from "@mui/material";
import axios from "axios";

const Header = () => {
    const navigate = useNavigate();
    const { mode, setMode } = useColorScheme();
    if (!mode) {
        return null;
    }
    const handleLogout = () => {
        localStorage.removeItem("name");
        axios
            .post(`${process.env.REACT_APP_SERVER}/auth/logout`)
            .then(() => navigate("/"));
    };

    return (
        <>
            <header className="header-container">
                {/* LEFT side: Title + subnav buttons */}
                <div className="title-container">
                    <h1 className="header-title" onClick={() => navigate("/dashboard")}>
                        Bank Ido's
                    </h1>
                    <div className="button-group">
                        <FormControlLabel control={<Switch  checked={mode === 'dark'}
                                                            onChange={(event) =>
                                                                setMode(event.target.checked ? 'dark' : 'light')}/>} label="darkMode" />
                        <Button variant="contained"   onClick={() => navigate("/dashboard")}>
                            Dashboard
                        </Button>
                        <Button variant="contained"   onClick={() => navigate("/dashboard/deposit")}>
                            Deposit
                        </Button>
                        <Button variant="contained"   onClick={() => navigate("/dashboard/withdraw")}>
                            Withdraw
                        </Button>
                        <Button variant="contained"   onClick={() => navigate("/dashboard/transfer")}>
                            Transfer
                        </Button>
                    </div>
                </div>

                {/* RIGHT side: Logout button */}

                <Button
                    className="logout-button"
                    variant="contained"
                    onClick={handleLogout}
                    sx={{ textTransform: "none", margin: "0 35px" }}
                >
                    LOGOUT
                </Button>

            </header>

            {/* Below the fixed header */}
            <main className="main-container">
                <Outlet />
            </main>
        </>
    );
};

export default Header;
