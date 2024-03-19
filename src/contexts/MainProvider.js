import React from 'react';
import { AuthProvider } from './Auth/AuthProvider';

const MainProvider = ({ children }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}

export default MainProvider;
