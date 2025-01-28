import React, {useEffect, useState} from "react";
import axios from "axios";
import {Typography} from "@mui/material";
import {formatNIS} from "../utils/utils";

export function Balance() {
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER}/account/balance`).then(response => {
            if(response.status === 200) {
                setData(response.data.balance);
            }
        }).catch(err => {
            if(err.response && err.response.message) {
                setData(err.response.message);
            } else {
                setData("Something went wrong");
            }
        })
    }, );
    if(data === null) {
        return (<div>Loading...</div>);
    }
    return <Typography fontSize={"2rem"} variant="h5">Balance:{formatNIS(data)}</Typography>;
}




