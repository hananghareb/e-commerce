import mongoose from "mongoose";
console.log(process.env.DB_URL);

export const dbconnection = (()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log('connected database successfully');
        
    }).catch((error)=>{
        console.log('unconnected database', error.message);
        
    })

}) 