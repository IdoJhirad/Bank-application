import React, { Component } from 'react';
import router from "./Routes/Routes";
import './App.css';
import {RouterProvider} from "react-router-dom";


export default function App() {
    return (
      <div className="App">
          <RouterProvider router={router}></RouterProvider>
      </div>
    );
}

