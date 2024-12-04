import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify
import axiosInstance from "../config/axiosInstance";

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axiosInstance.post('users/signup', { email, password });

            console.log("response", response);
            // Show success toast on successful signup
            if(response.status === 201){
                toast.success('Signup successful!', {
                    position: "top-right",
                    autoClose: 3000,
                });
    
                // Reset input fields
                setEmail('');
                setPassword('');
            }     
        } catch (error) {
            // Show error toast if the signup fails
            toast.error(error.response?.data?.message || 'Something went wrong!', {
                position: "top-right",
                autoClose: 3000,
            });
        } finally {
            setIsLoading(false); // Reset loading state
        }
    }
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Signup</h1>
            <form onSubmit={handleSignup}>
                {/* Email Input */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {/* Password Input */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                    {isLoading ? 'Signing up...' : 'Signup'}
                </button>
            </form>
            {/* Toast Container */}
            <ToastContainer />
        </div>
    )
}
export default Signup;
