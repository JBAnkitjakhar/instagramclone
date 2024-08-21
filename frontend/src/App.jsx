// App.jsx
import { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider, Outlet, useNavigate, Link } from 'react-router-dom'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from './redux/socketSlice'
import { setOnlineUsers } from './redux/chatSlice'
import { setLikeNotification } from './redux/rtnSlice'
import { setAuthUser } from '@/redux/authSlice'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import axios from 'axios'
import { toast } from 'sonner'
import { 
  HomeIcon, Search, Compass, MessageCircle, Heart, 
  PlusSquare, LogOut, Menu, X 
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar'
import { Button } from './components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover'
import CreatePost from './components/CreatePost'
import SuggestedUsers from './components/SuggestedUsers'
import { motion } from 'framer-motion'

import ProtectedRoutes from './components/ProtectedRoutes'
import HomePage from './components/Home'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import ChatPage from './components/ChatPage'
import Login from './components/Login'
import Signup from './components/Signup'

const Logo = () => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="mb-8 flex justify-center"
  >
    <h1 className="text-3xl font-serif italic text-white">ankitjakhar</h1>
  </motion.div>
);

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector((store) => store.realTimeNotification);
  const [open, setOpen] = useState(false);
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get('https://instagramclone-ygq0.onrender.com/api/v1/user/logout', { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === 'Logout') {
      logoutHandler();
    } else if (textType === 'Create') {
      setOpen(true);
    } else if (textType === 'Profile') {
      navigate(`/profile/${user?._id}`);
    } else if (textType === 'Home') {
      navigate('/');
    } else if (textType === 'Messages') {
      navigate('/chat');
    }
    setShowLeftSidebar(false);
  };

  const sidebarItems = [
    { icon: <HomeIcon size={24} />, text: 'Home' },
    { icon: <Search size={24} />, text: 'Search' },
    { icon: <Compass size={24} />, text: 'Explore' },
    { icon: <MessageCircle size={24} />, text: 'Messages' },
    { icon: <Heart size={24} />, text: 'Notifications' },
    { icon: <PlusSquare size={24} />, text: 'Create' },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt={user?.username} />
          <AvatarFallback>{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
      ),
      text: 'Profile',
    },
    { icon: <LogOut size={24} />, text: 'Logout' },
  ];

  return (
    <div className="flex min-h-screen gradient-background">
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md"
        onClick={() => setShowLeftSidebar(!showLeftSidebar)}
      >
        {showLeftSidebar ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`${
          showLeftSidebar ? 'block' : 'hidden'
        } md:block fixed left-0 top-0 h-full bg-transparent overflow-y-auto transition-transform duration-300 ease-in-out ${
          showLeftSidebar ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-64`}
      >
        <div className="flex flex-col h-full px-4">
          <Logo />
          <nav className="flex-grow space-y-1">
            {sidebarItems.map((item, index) => (
              <motion.div
                whileHover={{ x: 5 }}
                onClick={() => sidebarHandler(item.text)}
                key={index}
                className="flex items-center gap-4 cursor-pointer rounded-lg p-3 transition-all duration-200 ease-in-out hover:bg-gray-800"
              >
                <span className="text-white">{item.icon}</span>
                <span className="text-base font-medium text-white">{item.text}</span>
                {item.text === 'Notifications' && likeNotification.length > 0 && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button size="icon" className="ml-auto rounded-full h-5 w-5 bg-red-500 hover:bg-red-600 text-white text-xs">
                        {likeNotification.length}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        {likeNotification.length === 0 ? (
                          <p>No new notifications</p>
                        ) : (
                          likeNotification.map((notification) => (
                            <div key={notification.userId} className="flex items-center gap-2 my-2">
                              <Avatar>
                                <AvatarImage src={notification.userDetails?.profilePicture} />
                                <AvatarFallback>
                                  {notification.userDetails?.username.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <p className="text-sm">
                                <span className="font-bold">{notification.userDetails?.username}</span> liked your post
                              </p>
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
          <div className="mt-auto mb-4 p-3 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-400">Logged in as:</p>
            <p className="font-semibold text-white">{user?.username}</p>
          </div>
        </div>
      </div>
      <main className="flex-grow px-4 py-8 md:px-8 lg:px-12 md:ml-64 md:mr-80">
        <Outlet />
      </main>
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-full shadow-md"
        onClick={() => setShowRightSidebar(!showRightSidebar)}
      >
        {showRightSidebar ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`${
          showRightSidebar ? 'block' : 'hidden'
        } md:block fixed right-0 top-0 h-full bg-transparent overflow-y-auto transition-transform duration-300 ease-in-out ${
          showRightSidebar ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0 w-80`}
      >
        <div className="w-full md:w-64 lg:w-80 my-10 px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link to={`/profile/${user?._id}`}>
              <Avatar>
                <AvatarImage src={user?.profilePicture} alt="user_image" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <h1 className="font-semibold text-sm text-white">
                <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
              </h1>
              <span className="text-gray-300 text-sm">{user?.bio || 'Bio here...'}</span>
            </div>
          </div>
          <SuggestedUsers />
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/profile/:id', element: <Profile /> },
      { path: '/account/edit', element: <EditProfile /> },
      { path: '/chat', element: <ChatPage /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
]);

function App() {
  const { user } = useSelector((store) => store.auth);
  const { socket } = useSelector((store) => store.socketio);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io('https://instagramclone-ygq0.onrender.com', {
        query: { userId: user?._id },
        transports: ['websocket'],
      });
      dispatch(setSocket(socketio));

      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on('notification', (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <div className="min-h-screen gradient-background">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;

 
 