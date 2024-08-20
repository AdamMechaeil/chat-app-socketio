const { default: mongoose } = require("mongoose");

const connectDB=async()=>{
    try {
        const connected=await mongoose.connect(process.env.MONGO_URL);
        if(connected)
            console.log("Mongo Connected");
            
    } catch (error) {
        console.log(error);        
    }
}

module.exports=connectDB;