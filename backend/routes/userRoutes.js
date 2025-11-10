const isAuthenticated = require("../config/auth")
const { register, login, logout, bookMarks, getMyProfile, getOtherUsers, follow, unfollw } = require("../controllers/usercontroller")

const router = require("express").Router()

  

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.put("/bookmark/:id",isAuthenticated,bookMarks)
router.get("/profile/:id",isAuthenticated,getMyProfile)
router.get("/others/:id",isAuthenticated,getOtherUsers)
router.put("/follow/:id",isAuthenticated,follow)
router.put("/unfollow/:id",isAuthenticated,unfollw)


module.exports =router