import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // Check if the user is signed in by checking for the JWT token
    const isSignedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page
        navigate('/signin');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    MyApp
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {isSignedIn ? (
                            <>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signin">
                                        Sign In
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">
                                        Sign Up
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
