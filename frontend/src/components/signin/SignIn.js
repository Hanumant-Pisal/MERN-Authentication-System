import React, { useState } from 'react';
import './signin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // To track loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation for empty fields
        if (!email || !password) {
            toast.error('Please fill in both fields.'); // Show error toast if fields are empty
            return;
        }

        setLoading(true); // Set loading state to true during request

        const userData = { email, password };

        try {
            // Make POST request to the server
            const result = await axios.post('http://localhost:5555/auth/signin', userData);

            // Check if the response contains success: true
            if (result.data.success) {
                // Store the JWT token (for example, in localStorage)
                localStorage.setItem('jwtToken', result.data.jwtToken);

                // Show success toast
                toast.success('Sign In Successful!');

                // Navigate to dashboard after a short delay
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000); // Wait for 2 seconds before redirecting
            } else {
                // Handle unsuccessful login attempt (invalid credentials)
                toast.error(result.data.message || 'Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            toast.error('An error occurred. Please try again later.'); // Error toast for server issues
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="container-wrapper">
            <div className="main-container">
                <h1>Sign In</h1>
                <div className="fields">
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            type="email" // Email input type
                            placeholder="Email"
                            value={email}
                            required
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            type="password"
                            placeholder="Password"
                            value={password}
                            required
                        />
                        <button
                            className="input-field btn"
                            type="submit"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                </div>
                <div className="link">
                    <Link to="/SignUp" className="reg-link">
                        Create an Account? Sign Up
                    </Link>
                </div>
            </div>

            {/* Toast Notifications Container */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}

export default SignIn;
