import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from '../../Services/api';
import cookie from '../../Services/cookies';

export const AuthProvider = ({ children }) => {
    const [company, setCompany] = useState(null);


    useEffect(() => {
        const validateToken = async () => {
          const token = cookie.getToken();
          
            if (token) {  
                try {
                    const response = await api.validateToken();
                  
                    if (response.data) {
                        setCompany(response.data);
                       
                    } else {
                        // Se a validação falhar, limpe o token e defina o usuário como null.
                        cookie.deleteToken();
                        setCompany(null);
                    }
                } catch (error) {
                    
                    cookie.deleteToken();
                    setCompany(null);
                }
               
            }
        };
        validateToken();
    }, []);



    const signin = async (id, hash) => {
        try {
            
            const response = await api.login(id, hash);
            
            if(response.data){
               
                setCompany(response.data);
                cookie.setToken(response.data.gi_tvs);
               
                return response.data;
            }

            return false;
           
        } catch (error) {
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ company, signin }}>
            {children}
        </AuthContext.Provider>
    );
};