import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiImageOn } from "react-icons/ci";
import axios from "axios"
import toast from "react-hot-toast";
import { TWEET_API_END_POINT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { getAllTweets, getIsActive, getRefresh } from "../redux/tweetSlice";

const CreatePost = () => {
   const [description,setDescription] = useState("");
   const dispatch = useDispatch()
   const {user} = useSelector((state)=>state.user)
   const {isActive} = useSelector((state)=>state.tweet)

   const submitHandler = async() => {
       try {
        const res = await axios.post(`${TWEET_API_END_POINT}/create`,{description},{withCredentials:true})
        dispatch(getRefresh());
        if(res?.data?.success){
          toast.success(res?.data?.message);
        }
        setDescription("")
       } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
       }
   }
   const forYouHandler = () => {
     dispatch(getIsActive(true))
   }

   const followingHandler = () => {
        dispatch(getIsActive(false))
   }
  

  return (
    <div className="w-[100%]">
      <div>
        <div className="flex items-center justify-evenly border-b border-gray-200">
          <div onClick={forYouHandler}  className={`cursor-pointer hover:bg-gray-200 w-full rounded text-center px-4 py-3 
              ${isActive ? "border-b-4 border-blue-400" : "border-b-4 border-transparent"}`}>
            <h1 className="font-bold text-gray-700 text-lg">For You</h1>
          </div>
          <div onClick={followingHandler} className={`cursor-pointer hover:bg-gray-200 w-full rounded text-center px-4 py-3 
              ${!isActive ? "border-b-4 border-blue-400" : "border-b-4 border-transparent"}`}>
            <h1 className="font-bold text-gray-700 text-lg">Following</h1>
          </div>
        </div>
        <div className="">
          <div className="flex items-center ">
            <div>
              <Avatar
                src="https://static.vecteezy.com/system/resources/previews/027/951/137/non_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                size="50"
                round={true}
              />
            </div>

            <input
              className="w-full outline-none text-2xl ml-2"
              type="text"
              placeholder="What is happening ?!"
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div><CiImageOn size="25px"/></div>
            <button onClick={submitHandler} className="px-5 py-2 text-md bg-[#1D9BF0] border-none  rounded-full text-white font-bold">
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
