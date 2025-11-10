const express = require("express");
const userRoutes = require("./routes/userRoutes");
const tweetRoutes = require("./routes/tweetRoutes");
require("dotenv").config()
require("./config/database")
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const path = require("path")



app.use(
    cors({
      origin: "https://twitter-colne.onrender.com", 
      credentials: true,               
    })
  );
  const _dirname = path.resolve()

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users",userRoutes)
app.use("/api/tweets",tweetRoutes)



const port = process.env.port || 8000

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get(/.*/,(req,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})


app.listen(port,()=>{
    console.log("server is running on",port)
})