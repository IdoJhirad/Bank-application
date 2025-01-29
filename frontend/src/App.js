import React, { Component } from 'react';
import router from "./Routes/Routes";
import './App.css';
import {RouterProvider} from "react-router-dom";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";


export default function App() {
    return (

        <div className="App">
          <RouterProvider router={router}></RouterProvider>
        </div>

    );
}

