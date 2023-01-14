import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
/////////////////////////////////
///// MongoDB Connection
var connectDb
try{
     connectDb=mongoose.connect('mongodb+srv://Aftab-Taabi:<PASSWORD>@cluster0.2m6pczo.mongodb.net/?retryWrites=true&w=majority'.replace('<PASSWORD>','MongoDB.' ), {

    }).then(() =>console.log("DB connection established!"))
    
}catch(err){
console.log(err);

}

export const db = {
    connectDb
  }