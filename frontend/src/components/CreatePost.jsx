 

import { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store=>store.auth);
  const {posts} = useSelector(store=>store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  }

 
    const createPostHandler = async () => {
      const formData = new FormData();
      formData.append("caption", caption);
      if (imagePreview) formData.append("image", file);
      try {
        setLoading(true);
        const res = await axios.post('https://instagramclone-ygq0.onrender.com/api/v1/post/addpost', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
        if (res.data.success) {
          dispatch(setPosts([res.data.post, ...posts]));// [1] -> [1,2] -> total element = 2
          toast.success(res.data.message);
          setOpen(false);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    }
  

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-r from-black via-gray-800 to-blue-900 text-white">
        <DialogHeader className="text-2xl font-bold mb-4">Create New Post</DialogHeader>
        
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
            <AvatarImage src={user?.profilePic} />
          </Avatar>
          <div>
            <p className="font-semibold">{user?.username}</p>
            <p className="text-sm text-gray-300">Bio here...</p>
          </div>
        </div>
        
        <Textarea 
          value={caption} 
          onChange={(e) => setCaption(e.target.value)} 
          className="focus-visible:ring-transparent border-none bg-gray-700 text-white placeholder-gray-400 mb-4" 
          placeholder="Write a caption..." 
        />
        
        {imagePreview && (
          <div className='w-full h-64 flex items-center justify-center mb-4'>
            <img src={imagePreview} alt="preview_img" className='object-cover h-full w-full rounded-md' />
          </div>
        )}
        
        <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} />
        
        <Button 
          onClick={() => imageRef.current.click()} 
          className='w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white'
        >
          Select from computer
        </Button>
        
        {imagePreview && (
          loading ? (
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button onClick={createPostHandler} type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Post
            </Button>
          )
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost