import React from "react";
import Avatar from "react-avatar";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useGetProfile from "../hook/useGetProfile";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "../utils/constant";
import { followingUpdate } from "../redux/userSlice";
import { getRefresh } from "../redux/tweetSlice";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch()

  const { user, profile } = useSelector((state) => state.user);
  useGetProfile(id);

  const followAndUnfollowHandler = async() => {
    if(user?.following?.includes(id)){
           // unfollow
           try {
            const res = await axios.put(`${USER_API_END_POINT}/unfollow/${id}`,{id:user._id},{
              withCredentials:true
            })
           
           dispatch(followingUpdate(id))
           dispatch(getRefresh())
            toast.success(res?.data?.message)
           } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error)
           }
    }else {
          // follow 
          try {
            const res = await axios.put(`${USER_API_END_POINT}/follow/${id}`,{id:user._id},{
              withCredentials:true
            })
           
            dispatch(followingUpdate(id))
            dispatch(getRefresh())
            toast.success(res?.data?.message)
           } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error)
           }
    }
  }


  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div>
        <div className="flex items-center px-4 py-2">
          <Link
            to="/"
            className="p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer"
          >
            <FaArrowLeft size="24px" />
          </Link>
          <div className="ml-2">
            <h1 className="font-bold text-lg">{profile?.name}</h1>
            <p className="text-gray-500 text-sm">10 post</p>
          </div>
        </div>
        <img
          className="w-full h-50"
          src="https://images.pexels.com/photos/270366/pexels-photo-270366.jpeg?cs=srgb&dl=codes-coding-computer-270366.jpg&fm=jpg"
          alt="imgae"
        />
        <div className="absolute top-48 ml-2 border-4 border-white rounded-full">
          <Avatar
            src="https://64.media.tumblr.com/645e3a6095addfa834bda9fa65627d9b/e844a78e09cd1a8f-ae/s1280x1920/36160fee5355e7671e4fa10a076c10ac33d68ab4.jpg"
            size="120"
            round={true}
          />
        </div>
        <div className="text-right m-4 ">
          {user?._id === profile?._id ? (
            <>
              {" "}
              <button className="px-4 py-1 rounded-full hover:bg-gray-400 cursor-pointer border border-gray-400">
                Edit Profile
              </button>
            </>
          ) : (
            <>
              {" "}
              <button  onClick={followAndUnfollowHandler} className="px-4 py-1 rounded-full hover:bg-gray-400 cursor-pointer border border-gray-400 text-xl font-bold bg-black text-white">
                {user?.following?.includes(id) ? "Following" : "Follow"}
              </button>
            </>
          )}
        </div>
        <div className="m-4">
          <h1 className="font-bold text-2xl">{profile?.name}</h1>
          <p className="text-gray-500 text-sm font-semibold">{`@${profile?.username}`}</p>
        </div>
        <div className="m-4 text-sm">
          <p>
            Mern stack devloper blongs to bihar current location is noida
            utterpardesh
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
