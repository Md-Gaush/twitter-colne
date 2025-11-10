const mongoose = require("mongoose")



const URl = process.env.BASE_URL

mongoose.connect(URl).then((res)=>{
   
}).catch((err)=>{
    console.log("db error",err)
})