 

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setSelectedUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import axios from 'axios';
import { setMessages } from '@/redux/chatSlice';

const ChatPage = () => {
    const [textMessage, setTextMessage] = useState("");
    const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth);
    const { onlineUsers, messages } = useSelector(store => store.chat);
    const dispatch = useDispatch();

    const sendMessageHandler = async (receiverId) => {
        try {
            const res = await axios.post(`https://instagramclone-ygq0.onrender.com/api/v1/message/send/${receiverId}`, { textMessage }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setTextMessage("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setSelectedUser(null));
        }
    }, [dispatch]);

    return (
        <div className='flex h-screen bg-gradient-to-r from-black via-gray-800 to-blue-900 text-white'>
            <section className='w-full md:w-1/4 my-8 p-4 bg-gray-900 rounded-xl shadow-lg'>
                <h1 className='font-bold mb-4 text-2xl'>{user?.username}</h1>
                <hr className='mb-4 border-gray-500' />
                <div className='overflow-y-auto h-[70vh]'>
                    {suggestedUsers.map((suggestedUser) => {
                        const isOnline = onlineUsers.includes(suggestedUser?._id);
                        return (
                            <div
                                key={suggestedUser?._id}
                                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                                className='flex gap-3 items-center p-3 rounded-lg hover:bg-gray-800 cursor-pointer'
                            >
                                <Avatar className='w-14 h-14'>
                                    <AvatarImage src={suggestedUser?.profilePicture} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <span className='font-medium'>{suggestedUser?.username}</span>
                                    <span className={`text-xs font-bold ${isOnline ? 'text-green-400' : 'text-red-500'}`}>
                                        {isOnline ? 'online' : 'offline'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {selectedUser ? (
                <section className='flex-1 border-l border-l-gray-500 flex flex-col h-full bg-gray-900 rounded-xl shadow-lg'>
                    <div className='flex gap-3 items-center px-4 py-3 border-b border-gray-500 sticky top-0 bg-gradient-to-r from-black via-gray-800 to-blue-900 z-10'>
                        <Avatar>
                            <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                            <span className='font-medium'>{selectedUser?.username}</span>
                        </div>
                    </div>
                    <Messages selectedUser={selectedUser} />
                    <div className='flex items-center p-4 border-t border-t-gray-500'>
                        <Input
                            value={textMessage}
                            onChange={(e) => setTextMessage(e.target.value)}
                            type="text"
                            className='flex-1 mr-2 focus-visible:ring-transparent bg-gray-800 text-white'
                            placeholder="Type a message..."
                        />
                        <Button onClick={() => sendMessageHandler(selectedUser?._id)} className="bg-blue-600 hover:bg-blue-700 text-white">
                            Send
                        </Button>
                    </div>
                </section>
            ) : (
                <div className='flex flex-col items-center justify-center mx-auto'>
                    <MessageCircleCode className='w-32 h-32 my-4 text-blue-500' />
                    <h1 className='font-medium text-xl'>Your messages</h1>
                    <span className='text-gray-400'>Send a message to start a chat.</span>
                </div>
            )}
        </div>
    );
}

export default ChatPage;
