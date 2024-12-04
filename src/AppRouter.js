import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import ProtectedRoute from './auth/ProtectedRoute ';
import Feed from './components/Feed';

const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/feed"
                element={
                    <ProtectedRoute>
                        <Feed />
                    </ProtectedRoute>
                }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
        </Routes>
    );
}

export default AppRouter;