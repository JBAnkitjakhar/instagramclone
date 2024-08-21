// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

// const SuggestedUsers = () => {
//     const { suggestedUsers } = useSelector(store => store.auth);
//     return (
//         <div className='my-10'>
//             <div className='flex items-center justify-between text-sm'>
//                 <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
//                 <span className='font-medium cursor-pointer'>See All</span>
//             </div>
//             {
//                 suggestedUsers.map((user) => {
//                     return (
//                         <div key={user._id} className='flex items-center justify-between my-5'>
//                             <div className='flex items-center gap-2'>
//                                 <Link to={`/profile/${user?._id}`}>
//                                     <Avatar>
//                                         <AvatarImage src={user?.profilePicture} alt="post_image" />
//                                         <AvatarFallback>CN</AvatarFallback>
//                                     </Avatar>
//                                 </Link>
//                                 <div>
//                                     <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
//                                     <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
//                                 </div>
//                             </div>
//                             <span className='text-[#3BADF8] text-xs font-bold cursor-pointer hover:text-[#3495d6]'>Follow</span>
//                         </div>
//                     )
//                 })
//             }

//         </div>
//     )
// }

// export default SuggestedUsers



import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth);
    return (
        <div className='my-10 bg-white rounded-lg shadow p-4'>
            <div className='flex items-center justify-between text-sm mb-4'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer text-blue-500 hover:text-blue-600'>See All</span>
            </div>
            <div className='space-y-4'>
                {suggestedUsers.map((user) => (
                    <div key={user._id} className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <Link to={`/profile/${user?._id}`}>
                                <Avatar>
                                    <AvatarImage src={user?.profilePicture} alt={user?.username} />
                                    <AvatarFallback>{user?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div>
                                <h1 className='font-semibold text-sm'>
                                    <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
                                </h1>
                                <span className='text-gray-500 text-xs'>{user?.bio || 'Bio here...'}</span>
                            </div>
                        </div>
                        <button className='text-blue-500 text-xs font-bold cursor-pointer hover:text-blue-600'>
                            Follow
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SuggestedUsers