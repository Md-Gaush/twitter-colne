import React from "react";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const RightSidebar = ({otherUsers}) => {
  return (
    <div className="w-[20%] ">
      <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none w-full">
        <CiSearch size="24px" />
        <input
          className=" bg-transparent outline-none px-2"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="p-4 bg-gray-100 rounded-2xl my-4">
        <h1 className="font-bold text-2xl">How To Follow</h1>
        {
          otherUsers?.map((user)=>{
            return (
              <div className="flex items-center justify-between my-3" key={user._id}>
              <div className="flex ">
                <div >
                  <Avatar
                    src="https://static.vecteezy.com/system/resources/previews/027/951/137/non_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png"
                    size="40"
                    round={true}
                  />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-sm">{`@${user?.username}`}</p>
                </div>
                <div>
                  <Link to={`/profile/${user._id}`}>
                   <button className="px-2 py-2 bg-black text-white rounded-full">Profile</button>
                   </Link>
                </div>
              </div>
            </div>
            )
          })
        }
      
      </div>
    </div>
  );
};

export default RightSidebar;
