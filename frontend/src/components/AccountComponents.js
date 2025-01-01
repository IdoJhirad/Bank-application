import React, {useEffect, useState} from "react";
import axios from "axios";

export function Balance({reloadBalance, setReloadBalance}) {
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
    }, [reloadBalance, setReloadBalance]);
    if(data === null) {
        return (<div>Loading...</div>);
    }
    return (<div>{data}</div>)
}




