const Tweet = require("../models/tweetSchema");
const User = require("../models/userSchema");

// create tweets
const createTweet = async (req, res) => {
  try {
    const { description} = req.body;
    const userId = req.user; 
    if (!description  ) {
      return res.status(401).json({
        message: "All Fields are required",
        success: false,
      });
    }
    const user = await User.findById(userId).select("-password")
    if(!user){
      return res.status(401).json({
        message:"Login User not founded"
      })
    }
    await Tweet.create({
        description,
        userId:userId,
        userDetails:user 
    })
    return res.status(201).json({
        message : "Tweet crated successfully..",
        success : true
    })
  } catch (error) {
    console.log(error);
  }
};
// delete tweet
const deleteTweet = async(req,res) =>{
    try {
       const tweetId = req.params.id
       const userId = req.user; 
       // Find the tweet first
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({
        message: "Tweet not found",
        success: false,
      });
    }
     // Check ownership
     if (tweet.userId.toString() !== userId) {
      return res.status(403).json({
        message: "Not authorized to delete this tweet",
        success: false,
      });
    }
       await Tweet.findByIdAndDelete(tweetId)
       return res.status(201).json({
        message : "Tweet Deleted Successfully.",
        success : true
       })
    } catch (error) {
      console.log(error)
    }
}
// like and dislike

const likeOrDislike = async(req,res)=>{
  try {
    const loggedInUserId = req.body.id;
    const tweetId = req.params.id;
    const tweet = await Tweet.findById(tweetId)
          
    if(tweet.like.includes(loggedInUserId)){
      // dislike
      await Tweet.findByIdAndUpdate(tweetId ,{$pull:{like:loggedInUserId}} );
      return res.status(201).json({
        message : "User Dislike Your Tweet",
        success : true
      })
    }else{
      // like
      await Tweet.findByIdAndUpdate(tweetId,{$push:{like:loggedInUserId}})
      return res.status(201).json({
        message : "User Like Your Tweet",
        success : true
      })
    }
  } catch (error) {
    console.log("likedilike error",error)
  }
}
// get all tweets
const getAllTweets = async(req,res)=>{
  try {
     // loggedInUserTweets + following Tweet
     const id = req.params.id
     const loggedInUser = await User.findById(id)
     const loggedInUserTweets = await Tweet.find({userId:id});
     const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUserId)=>{
        return Tweet.find({userId:otherUserId})
     }))
       return res.status(200).json({
        tweets : loggedInUserTweets.concat(...followingUserTweets),
        message:"All tweet here",
        success:true
       })
  } catch (error) {
    console.log("getAllTweet",error)
  }
}

//  getFollowing Tweet
const getFollowingTweet = async(req,res)=>{
   try {
    const id = req.params.id
    const loggedInUser = await User.findById(id)
    
    const followingUserTweets = await Promise.all(loggedInUser.following.map((otherUserId)=>{
       return Tweet.find({userId:otherUserId})
    }))
      return res.status(200).json({
       tweets : [].concat(...followingUserTweets),
       message:"All tweet here",
       success:true
      })
   } catch (error) {
    console.log("getFollowingTweet",error)
   }
}


module.exports = {
    createTweet,
    deleteTweet,
    likeOrDislike,
    getAllTweets,
    getFollowingTweet
 
}