import React from 'react'
import Avatar from 'react-avatar'
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { getRefresh } from '../redux/tweetSlice';
import { MdDeleteForever } from "react-icons/md";

const Tweet = ({tweet}) => {
  const {user} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  
  const likeOrDislikeHandler = async(id) =>{
       try {
        const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`,{id:user?._id},{withCredentials:true})
        dispatch(getRefresh())
        
          toast.success(res?.data?.message)
        
       } catch (error) {
        toast.error(error.response.data.message)
        console.log(error)
       }
  }

  const deleteTweetHandler = async(id)=>{
    try {
      axios.defaults.withCredentials = true;
       const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`)
       dispatch(getRefresh())
       toast.success(res?.data?.message)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <div className='border-b border-gray-200'>
        <div>
            <div className='flex p-4'>
            <Avatar
                src="https://static.vecteezy.com/system/resources/previews/027/951/137/non_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                size="50"
                round={true}
              />
              <div className='ml-2 w-full'>
              <div className='flex items-center '>
                <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
                <p className='text-gray-500 text-sm ml-2'>{`@${tweet?.userDetails[0]?.username}`}</p>
              </div>
              <div>
                <p>{tweet.description}</p>
             </div>
             <div className='flex justify-between my-2'>
                <div className='flex items-center'>
                    <div onClick={()=>likeOrDislikeHandler(tweet?._id)} className='p-2 hover:bg-green-200 cursor-pointer rounded-full'>
                      <CiHeart size="24px"/> 
                    </div>
                    <p className='ml-1'>{tweet?.like?.length}</p>
                    </div>
                <div className='flex items-center'>
                    <div  className='p-2 hover:bg-pink-200 cursor-pointer rounded-full'>
                    <FaRegComment size="20px"/>
                    </div>
                   
                    <p className='ml-1'>0</p>
                    </div>
                    <div className='flex items-center'>
                    <div className='p-2 hover:bg-yellow-200 cursor-pointer rounded-full'>
                    <FaRegBookmark size="20px"/>
                    </div>
                    <p className='ml-1'>0</p>
                    </div>
                    {
                      user?._id === tweet.userId && <> <div className='flex items-center'>
                      <div onClick={()=>deleteTweetHandler(tweet?._id)} className='p-2 hover:bg-red-400 cursor-pointer rounded-full'>
                      <MdDeleteForever size="28px"/>
                      </div>
                      <p className='ml-1'>0</p>
                      </div></>
                    }
                   
                    
               </div>
              </div>
             
            </div>
        </div>
    </div>
  )
}

export default Tweet