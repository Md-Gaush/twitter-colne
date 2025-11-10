const { createTweet, deleteTweet, likeOrDislike, getAllTweets, getFollowingTweet } = require("../controllers/tweetController")
const isAuthenticated = require("../config/auth")

const router = require("express").Router()




router.post("/create",isAuthenticated, createTweet)
router.delete("/delete/:id",isAuthenticated, deleteTweet)
router.put("/like/:id",isAuthenticated, likeOrDislike)
router.get("/alltweet/:id",isAuthenticated,getAllTweets)
router.get("/followingtweet/:id",isAuthenticated,getFollowingTweet)


module.exports = router