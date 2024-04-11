import mongoose from 'mongoose';

export const connnectToMongoose = async() =>{
    try{
     await mongoose.connect(process.env.DB_URL)
     console.log("Mongoose connected successfully");
    }catch(err){
        console.log(err.message);
    }
}