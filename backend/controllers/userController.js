const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register
const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
   
    if (!name || !username || !email || !password) {
      return res.status(401).json({
        message: "All Field Are Required",
        success: false,
      });
    }

    const user = await User.findOne({email});
    if (user) {
      return res.status(401).json({
        message: "User Already Exist. Please Login",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      message: "Account Created Successfuly.",
      success: true,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "All Field Are Required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Please Enter Valid Email",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorect Email and Password",
        success: false,
      });
    }
    const token = await jwt.sign(
      { userId: user._id },
      process.env.TOKEN_SECRATE,
      { expiresIn: "1d" }
    );
    return res
      .status(201)
      .cookie("token", token, { expiresIn: "1d", httpOnly: true })
      .json({
        success: true,
        message: `Welcome Back ${user.name}`,
        user
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

// logout
const logout = async (req, res) => {
  return res
    .status(201)
    .cookie("token", "", { httpOnly: true, expires: new Date(0) })
    .json({
      message: "Logout successful",
      success: true,
    });
};

// bookmarks
const bookMarks = async (req, res) => {
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const user = await User.findById(loggedInUserId);
    if (user.bookmark.includes(tweetId)) {
      // unMarks
      await User.findByIdAndUpdate(loggedInUserId, {
        $pull: { bookmark: tweetId },
      });
      return res.status(201).json({
        message: "Remove BookMarks",
        success: true,
      });
    } else {
      // bookMarks
      await User.findByIdAndUpdate(loggedInUserId, {
        $push: { bookmark: tweetId },
      });
      return res.status(201).json({
        message: " BookMarks",
        success: true,
      });
    }
  } catch (error) {
    console.log("BookMarkError", error);
  }
};
// get my profile
const getMyProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    return res.status(201).json({
      user,
      message: "User get profile",
      success: true,
    });
  } catch (error) {
    console.log("profile error", error);
  }
};
// get all user
const getOtherUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const otherUser = await User.find({ _id: { $ne: id } }).select("-password");
    if (!otherUser) {
      return res.status(401).json({
        message: "User Are Not Founded",
        success: "false",
      });
    }
    return res.status(201).json({
      otherUser,
    });
  } catch (error) {
    console.log("getAllUsers", error);
  }
};
// follow
const follow = async(req,res)=>{
  try {
    const loggedInUserId = req.body.id?.trim(); 
    const userId = req.params.id?.trim(); 
    const loggedInUser = await User.findById(loggedInUserId)
    const user = await User.findById(userId) 
    if(!user.followers.includes(loggedInUserId)){
        await user.updateOne({$push:{followers:loggedInUserId}})
        await loggedInUser.updateOne({$push:{following:userId}})
    } else{
      return res.status(400).json({
        message:`you already followed to ${user.name} `
      })
    };
    return res.status(200).json({
      message:`${loggedInUser.name} just follow to ${user.name}`,
      success:true
    })
  } catch (error) {
    console.log("following error",error)
  }
}
//unfollw
const unfollw = async(req,res)=>{
  try {
    const loggedInUserId = req.body.id?.trim(); 
    const userId = req.params.id?.trim(); 
    const loggedInUser = await User.findById(loggedInUserId)
    const user = await User.findById(userId) 
    if(loggedInUser.following.includes(userId)){
        await user.updateOne({$pull:{followers:loggedInUserId}})
        await loggedInUser.updateOne({$pull:{following:userId}})
    } else{
      return res.status(400).json({
        message:`user has not follow yet`
      })
    };
    return res.status(200).json({
      message:`${loggedInUser.name} unfollow to ${user.name}`,
      success:true
    })
  } catch (error) {
    console.log("unfollw error",error)
  }
}

module.exports = {
  register,
  login,
  logout,
  bookMarks,
  getMyProfile,
  getOtherUsers,
  follow,
  unfollw
};
