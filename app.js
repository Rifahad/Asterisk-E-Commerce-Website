const express=require("express")
const app=express()
require("dotenv").config()
const port=process.env.PORT || 8086
const path=require("path")
const mongoose=require("mongoose")
const session=require("express-session")
mongoose.connect("mongodb://localhost/MainProject").then(()=>{
    console.log( "succes");
})

const common=require("./router/userRoute")
const adminRoutes=require("./router/adminRoute")

app.use(session({
    secret: process.env.KEY,
    resave: false,
    saveUninitialized: false,
}));


app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))


app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
app.use("/",common)
app.use("/",adminRoutes)

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})


