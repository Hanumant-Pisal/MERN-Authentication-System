import React, { useState } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);  // Track the submitting state
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Avoid multiple toasts while submitting
        if (isSubmitting) return;
        setIsSubmitting(true); // Set submitting state to true

        // Basic validation
        if (!username || !email || !password) {
            // Show toast only if not already shown
            if (!toast.isActive('fields-error')) {
                toast.error('All fields are required.', { toastId: 'fields-error' });
            }
            setIsSubmitting(false); // Reset the submitting state
            return;
        }

        // Check password length
        if (password.length < 4) {
            // Show an error toast only for passwords less than 4 characters long
            if (!toast.isActive('password-error')) {
                toast.error('Password must be at least 4 characters long.', { toastId: 'password-error' });
            }
            setIsSubmitting(false); // Reset the submitting state
            return;
        }

        // Call the API to register the user
        axios.post('http://localhost:5555/auth/signup', { username, email, password })
            .then(result => {
                console.log(result);
                // Show success toast, and redirect after a short delay
                if (!toast.isActive('signup-success')) {
                    toast.success('Sign up successful!', { toastId: 'signup-success' });
                }
                setTimeout(() => {
                    navigate('/'); // Redirect to SignIn page after 2 seconds
                }, 2000); // Redirect after 2 seconds
            })
            .catch(err => {
                console.log(err);
                // Show error toast for failed signup
                const errorMessage = err.response?.data?.message || 'An error occurred, please try again.';
                if (!toast.isActive('signup-error')) {
                    toast.error(errorMessage, { toastId: 'signup-error' });
                }
                setIsSubmitting(false); // Reset submitting state
            });
    };

    return (
        <div className='container-wrapper'>
            <div className='main-container'>
                <h1>Sign Up</h1>

                <div className="fields">
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={(e) => setUserName(e.target.value)}
                            className='input-field'
                            type="text"
                            placeholder='Username'
                            value={username}
                        />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            className='input-field'
                            type="email"
                            placeholder='Email'
                            value={email}
                        />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            className='input-field'
                            type="password"
                            placeholder='Password'
                            value={password}
                        />
                        <button className='input-field btn' type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                </div>
                <div className='link'>
                    <Link to='/' className='reg-link'>
                        Already have an account? Sign In
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

export default SignUp;
