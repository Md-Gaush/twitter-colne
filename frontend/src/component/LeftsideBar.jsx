import React from "react";
import { IoHome } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io"
import { MdOutlineBookmarks } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_END_POINT } from "../utils/constant";
import { getMyProfile, getOtherUsers, getUser } from "../redux/userSlice";



const LeftsideBar = () => {
  const {user} = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

 

  const logOutHandler = async() =>{
       try {
        const res = await axios.get(`${USER_API_END_POINT}/logout`,{
          withCredentials:true
        })
        
        toast.success(res?.data?.message)
        dispatch( getUser(null))
        dispatch( getOtherUsers(null))
        dispatch( getMyProfile(null))
        navigate('/login')
       } catch (error) {
        toast.error(error?.response?.data?.message)
        console.log(error)
       }
  }



  return (
    <div className="w-[20%]">
      <div>
        <div>
          <img
          className="ml-4"
            width={"40px"}
            src="https://toppng.com/uploads/preview/twitter-x-new-logo-symbol-png-11692479881mg8srkkgy5.webp"
            alt="twitter-logo"
          />
        </div>
        <div className="my-4">
          <Link className="flex items-center my-2 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200">
            <IoHome size={"24px"} />
            <h1 className="font-bold text-lg ml-4">Home</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200">
            <MdOutlineExplore size={"30px"} />
            <h1 className="font-bold text-lg ml-4">Explore</h1>
          </div>
          <div className="flex items-center my-2 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200">
            <IoMdNotificationsOutline size={"30px"} />
            <h1 className="font-bold text-lg ml-4">Notification</h1>
          </div>
          <Link to={`/profile/${user?._id}`} className="flex items-center my-2 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200">
            <CgProfile size={"24px"} />
            <h1 className="font-bold text-lg ml-4">Profile</h1>
          </Link>
          <div className="flex items-center my-2 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200">
            <MdOutlineBookmarks size={"24px"} />
            <h1 className="font-bold text-lg ml-4">BookMarks</h1>
          </div>
          <div onClick={logOutHandler} className="flex items-center my-2 px-4 py-2 rounded-full cursor-pointer hover:bg-gray-200">
            <RiLogoutCircleLine size={"24px"} />
            <h1 className="font-bold text-lg ml-4">LogOut</h1>
          </div>
          <button  className="px-5 py-2 text-md bg-[#1D9BF0] border-none w-full rounded-full text-white font-bold">Post </button>
        </div>
      </div>
    </div>
  );
};

export default LeftsideBar;
