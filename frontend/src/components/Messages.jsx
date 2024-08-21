import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAllMessage from '@/hooks/useGetAllMessage';
import useGetRTM from '@/hooks/useGetRTM';

const Messages = ({ selectedUser }) => {
    useGetRTM();
    useGetAllMessage();
    const { messages } = useSelector(store => store.chat);
    const { user } = useSelector(store => store.auth);

    return (
        <div className='flex-1 p-6 bg-gradient-to-r from-black via-gray-800 to-blue-900 text-white rounded-xl overflow-y-auto'>
            <div className='flex justify-center mb-6'>
                <div className='flex flex-col items-center'>
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span className='text-xl font-semibold mt-2'>{selectedUser?.username}</span>
                    <Link to={`/profile/${selectedUser?._id}`}>
                        <Button className="h-8 my-2 bg-blue-600 hover:bg-blue-700 text-white">
                            View profile
                        </Button>
                    </Link>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                {
                    messages && messages.map((msg) => (
                        <div key={msg._id} className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-lg max-w-xs break-words ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>
                                {msg.message}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Messages;
