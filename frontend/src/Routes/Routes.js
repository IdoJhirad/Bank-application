import React from 'react';

import {createBrowserRouter} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/dashboard";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Deposit from "../pages/Deposit";
import Withdraw from "../pages/Withdraw";
import Transfer from "../pages/Transfer";
import Header from "../components/Header";


const router = createBrowserRouter(
[
        {path: "/", element: <Home />},
        {
                path: "/dashboard",
                element: (
                    <ProtectedRoute>
                            <Header />
                    </ProtectedRoute>
                ),
                children: [
                        { path: "", element: <Dashboard /> },
                        { path: "deposit", element: <Deposit /> },
                        { path: "withdraw", element: <Withdraw /> },
                        { path: "transfer", element: <Transfer /> },
                ],
        },
        {path:"*",element: <NotFound />}
        ]
);

export default router;