import React from 'react';

import {createBrowserRouter} from "react-router-dom";

import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";


const router = createBrowserRouter(
[
        {path: "/", element: <Home />},
        {path:"/dashboard", element:   <Dashboard />},
        {path:"*",element: <NotFound />}
        ]
);

export default router