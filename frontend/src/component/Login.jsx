import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";


const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [isLogin, setIsLoging] = useState(true);
  const [inputData, setInputData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const loginSignupHandler = () => {
    setIsLoging(!isLogin);
  };
  const HandleInputData = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
   
    if (isLogin) {
      //login
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, {
          email: inputData.email,
          password: inputData.password,
        }, {
          withCredentials: true,  // ✅ important
        });

        dispatch(getUser(res?.data?.user))
       
        if(res.data.success){
          toast.success(res.data.message)
        }
        navigate('/')
      } catch (error) {
        toast.error(error.response?.data?.message )
        console.error("Login error:", error.response.data.message);
      }
    } else {
      // signup
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          inputData
        );
       
        if(res.data.success){
          toast.success(res.data.message)
        }
        setIsLoging(!isLogin)
      } catch (error) {
        toast.error(error.response?.data?.message )
        console.error("Signup error1:",error.response.data.message);

      }
    }

    setInputData({
      name: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            className="ml-4"
            width={"200px"}
            src="https://toppng.com/uploads/preview/twitter-x-new-logo-symbol-png-11692479881mg8srkkgy5.webp"
            alt="twitter-logo"
          />
        </div>
        <div>
          <div className="my-5">
            <h1 className="font-bold text-6xl">Happening Now.</h1>
          </div>
          <h1 className="my-4 text-2xl font-bold">
            {isLogin ? "Login" : "Register"}
          </h1>
          <form className="flex flex-col w-[55%]" onSubmit={handleSubmitData}>
            {!isLogin && (
              <>
                {" "}
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={inputData.name}
                  className="outline-blue-500 border border-gray-800 px-4 py-2 rounded-full my-2"
                  onChange={HandleInputData}
                />
                <input
                  type="text"
                  placeholder="username"
                  name="username"
                  value={inputData.username}
                  className="outline-blue-500 border border-gray-800 px-4 py-2 rounded-full my-2"
                  onChange={HandleInputData}
                />
              </>
            )}

            <input
              type="email"
              placeholder="email"
              name="email"
              value={inputData.email}
              className="outline-blue-500 border border-gray-800 px-4 py-2 rounded-full my-2"
              onChange={HandleInputData}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={inputData.password}
              className="outline-blue-500 border border-gray-800 px-4 py-2 rounded-full my-2"
              onChange={HandleInputData}
            />

            <button className="px-5 py-2 text-md bg-[#1D9BF0] border-none w-full rounded-full text-white font-bold">
              {isLogin ? "Login" : "Register"}
            </button>
            <h1 className="cursor-pointer">
              {isLogin ? "Do not have account:-" : "Already have an account ?"}{" "}
              <span
                className="font-semibold text-blue-600"
                onClick={loginSignupHandler}
              >
                {isLogin ? "Register" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
