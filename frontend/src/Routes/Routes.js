import React from 'react';

import {createBrowserRouter} from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/dashboard";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";


const router = createBrowserRouter(
[
        {path: "/", element: <Home />},
        {path:"/dashboard", element:
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
        },
        {path:"*",element: <NotFound />}
        ]
);

export default router