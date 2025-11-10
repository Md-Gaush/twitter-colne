import React, { useEffect } from 'react'
import LeftsideBar from './LeftsideBar'
import RightSidebar from './RightSidebar'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import useOtherUsers from '../hook/useOtherUsers';
import { useSelector } from "react-redux"
import useGetMyTweets from '../hook/useGetMyTweets'

const Home = () => {
  const {user,otherUsers} = useSelector((state)=>state?.user)
  useOtherUsers(user?._id)
  useGetMyTweets(user?._id)

  const navigate = useNavigate();
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  },[])
  

  return (
    <div className='flex justify-between w-[80%] mx-auto'>
      <LeftsideBar/>
     <Outlet/>
      <RightSidebar otherUsers={otherUsers}/>
      
    </div>
  )
}

export default Home
