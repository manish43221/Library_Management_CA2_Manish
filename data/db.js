const mongoose=require("mongoose")
const connectdb=()=>{
try{
 mongoose.connect(process.env.MONGODB_URL);
 console.log("Database connected");
 }
 catch(error){
  console.log("Database not connected successfully.",error.message);
    }
}
module.exports=connectdb
