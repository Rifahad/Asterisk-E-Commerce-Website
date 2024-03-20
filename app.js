const express=require("express")
const app=express()

require("dotenv").config()
const port=process.env.PORT || 8086
const path=require("path")
const session=require("express-session")
const connectDB=require("./config/DB")
require('axios').default;

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`server started at port ${port}`);
    })
})
//
app.use(session({
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: false,
}));

//requiring routers and set as multer
const common=require("./router/userRoute")
const adminRoutes=require("./router/adminRoute")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use("/",common)
app.use("/",adminRoutes)