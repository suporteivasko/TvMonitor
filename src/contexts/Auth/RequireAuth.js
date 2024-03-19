import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate, useLocation } from 'react-router-dom';
import Cookie from '../../Services/cookies';


export const RequireAuth = ({ children, permission }) => {
    const location = useLocation();
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const token = Cookie.getToken();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    

    useEffect(() => {
        const checkAuth = async () => {
            if (!auth.company && !token) {
                navigate('/login');           } 
            
        };

        checkAuth();
    }, [auth.company, token, navigate]);
    
    

    return  children ;
}
