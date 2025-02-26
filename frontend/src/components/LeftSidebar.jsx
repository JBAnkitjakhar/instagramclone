
// import { motion } from 'framer-motion'
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { setAuthUser } from '@/redux/authSlice'
// import { setPosts, setSelectedPost } from '@/redux/postSlice'
// import axios from 'axios'
// import { toast } from 'sonner'
// import { 
//   Home, Search, Compass, MessageCircle, Heart, 
//   PlusSquare, LogOut, Menu, X 
// } from 'lucide-react'
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
// import CreatePost from './CreatePost'

// const Logo = () => (
//   <motion.div 
//     initial={{ y: -20, opacity: 0 }}
//     animate={{ y: 0, opacity: 1 }}
//     transition={{ delay: 0.2 }}
//     className="mb-8 flex justify-center"
//   >
//     <h1 className="text-3xl font-serif italic">Instagram</h1>
//   </motion.div>
// )

// const LeftSidebar = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { user } = useSelector(store => store.auth);
//     const { likeNotification } = useSelector(store => store.realTimeNotification);
//     const [open, setOpen] = useState(false);
//     const [isMobile, setIsMobile] = useState(false);
//     const [showMobileMenu, setShowMobileMenu] = useState(false);

//     useEffect(() => {
//         const handleResize = () => {
//             setIsMobile(window.innerWidth < 768);
//         };
        
//         window.addEventListener('resize', handleResize);
//         handleResize();
        
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const logoutHandler = async () => {
//         try {
//             const res = await axios.get('http://localhost:8000/api/v1/user/logout', { withCredentials: true });
//             if (res.data.success) {
//                 dispatch(setAuthUser(null));
//                 dispatch(setSelectedPost(null));
//                 dispatch(setPosts([]));
//                 navigate("/login");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     }

//     const sidebarHandler = (textType) => {
//         if (textType === 'Logout') {
//             logoutHandler();
//         } else if (textType === "Create") {
//             setOpen(true);
//         } else if (textType === "Profile") {
//             navigate(`/profile/${user?._id}`);
//         } else if (textType === "Home") {
//             navigate("/");
//         } else if (textType === 'Messages') {
//             navigate("/chat");
//         }
//         if (isMobile) {
//             setShowMobileMenu(false);
//         }
//     }

//     const sidebarItems = [
//         { icon: <Home size={24} />, text: "Home" },
//         { icon: <Search size={24} />, text: "Search" },
//         { icon: <Compass size={24} />, text: "Explore" },
//         { icon: <MessageCircle size={24} />, text: "Messages" },
//         { icon: <Heart size={24} />, text: "Notifications" },
//         { icon: <PlusSquare size={24} />, text: "Create" },
//         {
//             icon: (
//                 <Avatar className='w-6 h-6'>
//                     <AvatarImage src={user?.profilePicture} alt={user?.username} />
//                     <AvatarFallback>{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
//                 </Avatar>
//             ),
//             text: "Profile"
//         },
//         { icon: <LogOut size={24} />, text: "Logout" },
//     ]

//     const renderSidebarContent = () => (
//         <div className='flex flex-col h-full px-4'>
//             <Logo />
//             <nav className='flex-grow space-y-1'>
//                 {sidebarItems.map((item, index) => (
//                     <motion.div 
//                         whileHover={{ x: 5 }}
//                         onClick={() => sidebarHandler(item.text)} 
//                         key={index} 
//                         className='flex items-center gap-4 cursor-pointer rounded-lg p-3 transition-all duration-200 ease-in-out hover:bg-gray-100'
//                     >
//                         <span className='text-gray-500'>{item.icon}</span>
//                         <span className='text-base font-medium'>{item.text}</span>
//                         {item.text === "Notifications" && likeNotification.length > 0 && (
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Button size='icon' className="ml-auto rounded-full h-5 w-5 bg-red-500 hover:bg-red-600 text-white text-xs">{likeNotification.length}</Button>
//                                 </PopoverTrigger>
//                                 <PopoverContent>
//                                     <div>
//                                         {likeNotification.length === 0 ? (
//                                             <p>No new notifications</p>
//                                         ) : (
//                                             likeNotification.map((notification) => (
//                                                 <div key={notification.userId} className='flex items-center gap-2 my-2'>
//                                                     <Avatar>
//                                                         <AvatarImage src={notification.userDetails?.profilePicture} />
//                                                         <AvatarFallback>{notification.userDetails?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
//                                                     </Avatar>
//                                                     <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
//                                                 </div>
//                                             ))
//                                         )}
//                                     </div>
//                                 </PopoverContent>
//                             </Popover>
//                         )}
//                     </motion.div>
//                 ))}
//             </nav>
//             <div className='mt-auto mb-4 p-3 bg-gray-100 rounded-lg'>
//                 <p className='text-sm text-gray-500'>Logged in as:</p>
//                 <p className='font-semibold text-gray-800'>{user?.username}</p>
//             </div>
//         </div>
//     )

//     return (
//         <>
//             {isMobile && (
//                 <button 
//                     onClick={() => setShowMobileMenu(!showMobileMenu)}
//                     className="fixed top-4 left-4 z-50 p-2 bg-[rgba(210,191,201,0.8)] rounded-full shadow-md"
//                 >
//                     {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
//                 </button>
//             )}
//             {isMobile && showMobileMenu && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowMobileMenu(false)}></div>
//             )}
//             <div className={`
//                 fixed top-0 left-0 z-50 h-screen bg-[rgba(210,191,201,0.8)] transition-all duration-300 ease-in-out
//                 ${isMobile 
//                     ? `w-64 transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} shadow-lg`
//                     : 'w-64 border-r border-gray-200'
//                 }
//             `}>
//                 {renderSidebarContent()}
//             </div>
//             <CreatePost open={open} setOpen={setOpen} />
//         </>
//     )
// }

// export default LeftSidebar



import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { 
  Home, Search, Compass, MessageCircle, Heart, 
  PlusSquare, LogOut, Menu, X 
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import CreatePost from './CreatePost'

const Logo = () => (
  <motion.div 
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="mb-8 flex justify-center"
  >
    <h1 className="text-3xl font-serif italic">Instagram</h1>
  </motion.div>
)

const LeftSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const { likeNotification } = useSelector(store => store.realTimeNotification);
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        window.addEventListener('resize', handleResize);
        handleResize();
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const logoutHandler = async () => {
        try {
            const res = await axios.get('https://instagramclone-ygq0.onrender.com/api/v1/user/logout', { withCredentials: true });
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const sidebarHandler = (textType) => {
        if (textType === 'Logout') {
            logoutHandler();
        } else if (textType === "Create") {
            setOpen(true);
        } else if (textType === "Profile") {
            navigate(`/profile/${user?._id}`);
        } else if (textType === "Home") {
            navigate("/");
        } else if (textType === 'Messages') {
            navigate("/chat");
        }
        if (isMobile) {
            setShowMobileMenu(false);
        }
    }

    const sidebarItems = [
        { icon: <Home size={24} />, text: "Home" },
        { icon: <Search size={24} />, text: "Search" },
        { icon: <Compass size={24} />, text: "Explore" },
        { icon: <MessageCircle size={24} />, text: "Messages" },
        { icon: <Heart size={24} />, text: "Notifications" },
        { icon: <PlusSquare size={24} />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt={user?.username} />
                    <AvatarFallback>{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut size={24} />, text: "Logout" },
    ]

    const renderSidebarContent = () => (
        <div className='flex flex-col h-full px-4'>
            <Logo />
            <nav className='flex-grow space-y-1'>
                {sidebarItems.map((item, index) => (
                    <motion.div 
                        whileHover={{ x: 5 }}
                        onClick={() => sidebarHandler(item.text)} 
                        key={index} 
                        className='flex items-center gap-4 cursor-pointer rounded-lg p-3 transition-all duration-200 ease-in-out hover:bg-gray-100'
                    >
                        <span className='text-gray-500'>{item.icon}</span>
                        <span className='text-base font-medium'>{item.text}</span>
                        {item.text === "Notifications" && likeNotification.length > 0 && (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button size='icon' className="ml-auto rounded-full h-5 w-5 bg-red-500 hover:bg-red-600 text-white text-xs">{likeNotification.length}</Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div>
                                        {likeNotification.length === 0 ? (
                                            <p>No new notifications</p>
                                        ) : (
                                            likeNotification.map((notification) => (
                                                <div key={notification.userId} className='flex items-center gap-2 my-2'>
                                                    <Avatar>
                                                        <AvatarImage src={notification.userDetails?.profilePicture} />
                                                        <AvatarFallback>{notification.userDetails?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                                    </Avatar>
                                                    <p className='text-sm'><span className='font-bold'>{notification.userDetails?.username}</span> liked your post</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </motion.div>
                ))}
            </nav>
            <div className='mt-auto mb-4 p-3 bg-gray-100 rounded-lg'>
                <p className='text-sm text-gray-500'>Logged in as:</p>
                <p className='font-semibold text-gray-800'>{user?.username}</p>
            </div>
        </div>
    )

    return (
        <>
            {isMobile && (
                <button 
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md"
                >
                    {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
                </button>
            )}
            {isMobile && showMobileMenu && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowMobileMenu(false)}></div>
            )}
            <div className={`
                fixed top-0 left-0 z-50 h-screen bg-white transition-all duration-300 ease-in-out
                ${isMobile 
                    ? `w-64 transform ${showMobileMenu ? 'translate-x-0' : '-translate-x-full'} shadow-lg`
                    : 'w-64 border-r border-gray-200'
                }
            `}>
                {renderSidebarContent()}
            </div>
            <CreatePost open={open} setOpen={setOpen} />
        </>
    )
}

export default LeftSidebar