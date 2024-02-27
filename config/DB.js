const mongoose=require("mongoose")

const connectDB=async () =>{
    try{
        const connect =await mongoose.connect("mongodb://localhost/MainProject")
        console.log(`mongoDB connected`);
    }catch(error){
        console.log(`Error ocurred when connecting to database: ${error.message}`)
    }
}

module.exports=connectDB;
