// import  { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAuthUser } from '@/redux/authSlice';
// import { FaUser, FaLock} from 'react-icons/fa';
// // import bgImage from '/bg.jpg';

// const Login = () => {
//   const [input, setInput] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector(store => store.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleInputChange = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true
//       });
//       if (res.data.success) {
//         dispatch(setAuthUser(res.data.user));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(error.response?.data?.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) navigate("/");
//   }, [user, navigate]);

//   return (
//     <div className="login-container">
//       <div className="login-overlay"></div>
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="login-content"
//       >
//         {/* Login Form Side */}
//         <div className="login-form">
//           <motion.div 
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="login-logo"
//           >
//             <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <rect width="64" height="64" rx="16" fill="url(#instagram-gradient)"/>
//               <circle cx="32" cy="32" r="16" stroke="white" strokeWidth="4"/>
//               <circle cx="48" cy="16" r="4" fill="white"/>
//               <defs>
//                 <linearGradient id="instagram-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
//                   <stop stopColor="#FFDC80"/>
//                   <stop offset="0.5" stopColor="#E1306C"/>
//                   <stop offset="1" stopColor="#833AB4"/>
//                 </linearGradient>
//               </defs>
//             </svg>
//           </motion.div>
//           <form onSubmit={handleSubmit} className="login-form-fields">
//             <motion.div 
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="input-group"
//             >
//               <FaUser className="input-icon" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={input.email}
//                 onChange={handleInputChange}
//                 className="input-field cursor-pointer"
//               />
//             </motion.div>
//             <motion.div 
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="input-group"
//             >
//               <FaLock className="input-icon" />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={input.password}
//                 onChange={handleInputChange}
//                 className="input-field"
//               />
//             </motion.div>
//             <motion.button
//               type="submit"
//               disabled={loading}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="login-button"
//             >
//               {loading ? 'Signing In...' : 'LOGIN'}
//             </motion.button>
//           </form>
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="signup-link"
//           >
//             Don&#39;t have an account? <Link to="/signup">Sign up</Link>
//           </motion.p>
//         </div>

//         {/* Welcome Side */}
//         <div className="welcome-side">
//           <div className="welcome-content">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//             >
//               <h2  className="welcome-title">Welcome.</h2>
//               <p>Sign in to continue to your account</p>
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;


import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('https://instagramclone-ygq0.onrender.com/api/v1/user/login', input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div className="login-container">
      <div className="dynamic-background"></div>
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
          <form onSubmit={handleSubmit} className="login-form-fields">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="input-group"
            >
              <FaUser className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={input.email}
                onChange={handleInputChange}
                className="input-field"
              />
            </motion.div>
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="input-group"
            >
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={input.password}
                onChange={handleInputChange}
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
              {loading ? 'Signing In...' : 'LOGIN'}
            </motion.button>
          </form>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="signup-link"
          >
            Don&#39;t have an account? <Link to="/signup">Sign up</Link>
          </motion.p>
        </div>

        <div className="welcome-side">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="welcome-content"
          >
            <h2 className="welcome-title">Welcome.</h2>
            <p>Sign in to continue to your account</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;