require('dotenv').config
const express=require("express")
const connectdb=require("./data/db.js")
const libroutes=require("./Routes/libraryRoutes.js")
const PORT=process.env.PORT||8000
const app=express();
connectdb();
app.use(express.json());
app.use("/api/books",libroutes);
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})











