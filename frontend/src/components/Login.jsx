 

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAuthUser } from '@/redux/authSlice';
// import { FaUser, FaLock} from 'react-icons/fa';
// import bgImage from '/bg.jpg';

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
//     <div 
//     className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
//     style={{ 
//       backgroundImage: `url(${bgImage})`,
//       backgroundSize: 'cover',      // Ensure the image covers the entire area
//       backgroundPosition: 'center', // Center the image
//       backgroundRepeat: 'no-repeat' ,// Prevent the image from repeating
//       backgroundAttachment: 'fixed'
//     }}
//    >
//      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//      <motion.div 
//        initial={{ opacity: 0, scale: 0.9 }}
//        animate={{ opacity: 1, scale: 1 }}
//        transition={{ duration: 0.5 }}
//        className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl w-11/12 max-w-4xl flex flex-col md:flex-row overflow-hidden"
//      >
//         {/* Login Form Side */}
//         <div className="w-full md:w-1/2 p-8">
//           <motion.div 
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="mb-2 flex justify-center"
//           >
//             <motion.div 
//   initial={{ y: -20, opacity: 0 }}
//   animate={{ y: 0, opacity: 1 }}
//   transition={{ delay: 0.2 }}
//   className="mb-8 flex justify-center"
// >
//   <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <rect width="64" height="64" rx="16" fill="url(#instagram-gradient)"/>
//     <circle cx="32" cy="32" r="16" stroke="white" strokeWidth="4"/>
//     <circle cx="48" cy="16" r="4" fill="white"/>
//     <defs>
//       <linearGradient id="instagram-gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
//         <stop stopColor="#FFDC80"/>
//         <stop offset="0.5" stopColor="#E1306C"/>
//         <stop offset="1" stopColor="#833AB4"/>
//       </linearGradient>
//     </defs>
//   </svg>
// </motion.div>
//           </motion.div>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <motion.div 
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               className="relative"
//             >
//               <FaUser className="absolute top-3 left-3 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={input.email}
//                 onChange={handleInputChange}
//                 className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
//               />
//             </motion.div>
//             <motion.div 
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="relative"
//             >
//               <FaLock className="absolute top-3 left-3 text-gray-400" />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={input.password}
//                 onChange={handleInputChange}
//                 className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-gray-300 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
//               />
//             </motion.div>
//             <motion.button
//               type="submit"
//               disabled={loading}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold transition-all duration-300 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
//             >
//               {loading ? 'Signing In...' : 'LOGIN'}
//             </motion.button>
//           </form>
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             className="mt-6 text-center text-white"
//           >
//             Dont have an account? <Link to="/signup" className="text-purple-300 hover:text-purple-200">Sign up</Link>
//           </motion.p>
//         </div>

//         {/* Welcome Side */}
//         <div className="w-full md:w-1/2 p-12 flex flex-col justify-center items-start text-white relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 opacity-70"></div>
          
//           {/* Hexagon pattern background */}
//           <div className="absolute inset-0 opacity-20">
//             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//               <defs>
//                 <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
//                   <path d="M25 0 L50 14.4 L50 28.6 L25 43.4 L0 28.6 L0 14.4 Z" fill="none" stroke="white" strokeWidth="1"/>
//                 </pattern>
//               </defs>
//               <rect width="100%" height="100%" fill="url(#hexagons)" />
//             </svg>
//           </div>
          
//           {/* Glowing orb */}
//           <motion.div
//             className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-400 filter blur-xl opacity-50"
//             animate={{
//               scale: [1, 1.2, 1],
//               opacity: [0.5, 0.7, 0.5],
//             }}
//             transition={{
//               duration: 5,
//               repeat: Infinity,
//               repeatType: "reverse",
//             }}
//           />
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="relative z-10"
//           >
//             <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-500">Welcome.</h2>
//             <p className="text-xl font-semibold">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-500">Sign in to continue to your account</span>
//             </p>
//           </motion.div>
          
//           {/* Animated particles */}
//           {[...Array(10)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute w-1 h-1 bg-white rounded-full"
//               initial={{ 
//                 x: Math.random() * 100 + "%", 
//                 y: Math.random() * 100 + "%",
//                 opacity: 0 
//               }}
//               animate={{ 
//                 x: Math.random() * 100 + "%", 
//                 y: Math.random() * 100 + "%",
//                 opacity: [0, 1, 0] 
//               }}
//               transition={{
//                 duration: Math.random() * 5 + 5,
//                 repeat: Infinity,
//                 repeatType: "loop",
//               }}
//             />
//           ))}
//         </div>
//       </motion.div>
//     </div>
//     </div>
//   );
// };

// export default Login;





import  { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';
import { FaUser, FaLock} from 'react-icons/fa';
// import bgImage from '/bg.jpg';

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
      <div className="login-overlay"></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="login-content"
      >
        {/* Login Form Side */}
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
                  <stop stopColor="#FFDC80"/>
                  <stop offset="0.5" stopColor="#E1306C"/>
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
                className="input-field cursor-pointer"
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

        {/* Welcome Side */}
        <div className="welcome-side">
          <div className="welcome-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2  className="welcome-title">Welcome.</h2>
              <p>Sign in to continue to your account</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;