import mongoose from "mongoose";

export const dbconnection = (()=>{
    mongoose.connect('mongodb+srv://hanan:U6Y7ZYbxDazOxvi2@cluster0.kvu2m.mongodb.net/e-commerce').then(()=>{
        console.log('connected database successfully');
        
    }).catch(()=>{
        console.log('unconnected database');
        
    })

}) 