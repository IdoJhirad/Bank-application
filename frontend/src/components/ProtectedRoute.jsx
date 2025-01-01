import {useEffect, useState} from "react";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";


function ProtectedRoute ({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try{
                await axios.get(`${process.env.REACT_APP_SERVER}/auth/check-auth`, {})
                setIsAuthenticated(true);
            }catch (error) {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    },[])
    if(isAuthenticated===null){
        return (
            <>
                <>Loading ...</>
            </>
        )
    }
    return isAuthenticated ? children : <Navigate to="/" />;
}
export default ProtectedRoute;