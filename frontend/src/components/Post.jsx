 

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Badge } from './ui/badge'

const Post = ({ post }) => {
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post);
    const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
    const [postLike, setPostLike] = useState(post.likes.length);
    const [comment, setComment] = useState(post.comments);
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {//trim only white spaces so if anyone press space button multiple times so post button is not seen 
            setText(inputText);
        } else {
            setText("");
        }
    }

    const likeOrDislikeHandler = async () => {
        try {
            const action = liked ? 'dislike' : 'like';
            const res = await axios.get(`https://instagramclone-ygq0.onrender.com/api/v1/post/${post._id}/${action}`, { withCredentials: true });
            console.log(res.data);
            if (res.data.success) {
                const updatedLikes = liked ? postLike - 1 : postLike + 1;
                setPostLike(updatedLikes);
                setLiked(!liked);

                // apne post ko update krunga
                const updatedPostData = posts.map(p =>
                    p._id === post._id ? {
                        ...p,
                        likes: liked ? p.likes.filter(id => id !== user._id) : [...p.likes, user._id]
                    } : p
                );
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const commentHandler = async () => {

        try {
            const res = await axios.post(`https://instagramclone-ygq0.onrender.com/api/v1/post/${post._id}/comment`, { text }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            console.log(res.data);
            if (res.data.success) {
                const updatedCommentData = [...comment, res.data.comment];
                setComment(updatedCommentData);

                const updatedPostData = posts.map(p =>
                    p._id === post._id ? { ...p, comments: updatedCommentData } : p
                );

                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
                setText("");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deletePostHandler = async () => {
        try {
            const res = await axios.delete(`https://instagramclone-ygq0.onrender.com/api/v1/post/delete/${post?._id}`, { withCredentials: true })
            if (res.data.success) {
                const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id);
                dispatch(setPosts(updatedPostData));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.messsage);
        }
    }

    const bookmarkHandler = async () => {
        try {
            const res = await axios.get(`https://instagramclone-ygq0.onrender.com/api/v1/post/${post?._id}/bookmark`, {withCredentials:true});
            if(res.data.success){
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='my-8 w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden'>
            <div className='flex items-center justify-between p-4'>
  <div className='flex items-center gap-3'>
    <Avatar>
      <AvatarImage src={post.author?.profilePicture} alt="post_image" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div>
      <h1 className='font-semibold text-blue-600'>{post.author?.username}</h1>
      {user?._id === post.author._id && <Badge variant="secondary" className="text-xs text-gray-300 bg-gray-700">Author</Badge>}
    </div>
  </div>
  
  <Dialog>
    <DialogTrigger asChild>
      <MoreHorizontal className='cursor-pointer text-gray-500 hover:text-gray-900' />
    </DialogTrigger>
    <DialogContent className="flex flex-col items-center text-sm text-center text-white bg-gradient-to-r from-black via-gray-800 to-blue-900 p-4">
      {post?.author?._id !== user?._id && 
        <Button variant='ghost' className="cursor-pointer w-full text-[#ED4956] font-bold hover:bg-gray-700">Unfollow</Button>}
      <Button variant='ghost' className="cursor-pointer w-full text-white hover:bg-gray-700">Add to favorites</Button>
      {user && user?._id === post?.author._id && 
        <Button onClick={deletePostHandler} variant='ghost' className="cursor-pointer w-full text-white hover:bg-gray-700">Delete</Button>}
    </DialogContent>
  </Dialog>
</div>


            <img
                className='w-full aspect-square object-cover'
                src={post.image}
                alt="post_img"
            />
            <div className='p-4'>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-4'>
                        {liked ? 
                            <FaHeart onClick={likeOrDislikeHandler} size={24} className='cursor-pointer text-red-600' /> : 
                            <FaRegHeart onClick={likeOrDislikeHandler} size={22} className='cursor-pointer hover:text-gray-600' />
                        }
                        <MessageCircle onClick={() => {
                            dispatch(setSelectedPost(post));
                            setOpen(true);
                        }} className='cursor-pointer hover:text-gray-600' />
                        <Send className='cursor-pointer hover:text-gray-600' />
                    </div>
                    <Bookmark onClick={bookmarkHandler} className='cursor-pointer hover:text-gray-600' />
                </div>
                <span className='font-medium block mb-2'>{postLike} likes</span>
                <p className='mb-2'>
                    <span className='font-medium mr-2'>{post.author?.username}</span>
                    {post.caption}
                </p>
                {comment.length > 0 && (
                    <span onClick={() => {
                        dispatch(setSelectedPost(post));
                        setOpen(true);
                    }} className='cursor-pointer text-sm text-gray-400'>View all {comment.length} comments</span>
                )}
                <CommentDialog open={open} setOpen={setOpen} />
                <div className='flex items-center justify-between mt-4 bg-gray-100 rounded-full overflow-hidden'>
                    <input
                        type="text"
                        placeholder='Add a comment...'
                        value={text}
                        onChange={changeEventHandler}
                        className='outline-none text-sm w-full bg-transparent px-4 py-2'
                    />
                    {text && <span onClick={commentHandler} className='text-[#3BADF8] cursor-pointer px-4 py-2'>Post</span>}
                </div>
            </div>
        </div>
    )
}

export default Post