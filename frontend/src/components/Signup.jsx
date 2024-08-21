

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';

const Signup = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('https://instagramclone-ygq0.onrender.com/api/v1/user/register', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data && res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
                setInput({
                    username: "",
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                toast.error(error.response.data.message || 'An error occurred during registration');
            } else if (error.request) {
                toast.error('No response received from the server. Please try again.');
            } else {
                toast.error('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="login-container">
            <div className="login-overlay"></div>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="login-content"
            >
                <div className="login-form">
                <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="login-logo"
                    >
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="64" height="64" rx="16" fill="url(#instagram-gradient)"/>
                            <circle cx="32" cy="32" r="16" stroke="white" strokeWidth="4"/>
                            <circle cx="48" cy="16" r="4" fill="white"/>
                            <defs>
                                <linearGradient id="instagram-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#3679e3"/>
                                    <stop offset="0.5" stopColor="#772899"/>
                                    <stop offset="1" stopColor="#833AB4"/>
                                </linearGradient>
                            </defs>
                        </svg>
                    </motion.div>
                    <form onSubmit={signupHandler} className="login-form-fields">
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="input-group"
                        >
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={input.username}
                                onChange={changeEventHandler}
                                className="input-field"
                            />
                        </motion.div>
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="input-group"
                        >
                            <FaEnvelope className="input-icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={input.email}
                                onChange={changeEventHandler}
                                className="input-field"
                            />
                        </motion.div>
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="input-group"
                        >
                            <FaLock className="input-icon" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={input.password}
                                onChange={changeEventHandler}
                                className="input-field"
                            />
                        </motion.div>
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="login-button"
                        >
                            {loading ? 'Signing Up...' : 'SIGNUP'}
                        </motion.button>
                    </form>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="signup-link"
                    >
                        Already have an account? <Link to="/login">Login</Link>
                    </motion.p>
                </div>

                <div className="welcome-side">
                    <div className="welcome-content">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <h2 className="welcome-title">Join Us.</h2>
                            <p className="welcome-text">Sign up to see photos & videos from your friends</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Signup;