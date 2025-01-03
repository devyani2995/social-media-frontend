import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../config/axiosInstance';

const ProtectedRoute = ({ children }) => {
    const [isValid, setIsValid] = useState(null);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setIsValid(false);
                return;
            }

            try {
                const response = await axiosInstance.get("users/validate-token", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                if (response.status === 200) {
                    setIsValid(true);
                }
            } catch (err) {
                setIsValid(false);
            }
        }
        validateToken();
    }, []);

    if (isValid === null) {
        // Show a loading indicator while checking authentication
        return <div>Loading...</div>;
    }

    if (!isValid) {
        return <Navigate to="/signin" replace />;
    }
    return children;
};

export default ProtectedRoute;
