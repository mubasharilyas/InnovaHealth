

import mongoose from'mongoose';
import bcrypt from 'bcrypt';
 const userSchema = new mongoose.Schema({
  username:{
    type:String
  },
  gender:{
    gender:String
  },
    email:{
        type:String, 
        required:true, 
        unique:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
      password:{type:String,required:true}
})

userSchema.pre("save", async function(next) {
    console.log(this.password);
    if (!this.isModified("password")){
      console.log("IFF QUERY MIDDLEWARE ",this.isModified("password"))
      return next();
    }
    try {
      console.log("QUERY MIDDLEWARE ",this.isModified("password"))
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      return next();
    } catch (error) {
      return next();
    }
  });

  export const User = mongoose.model('User',userSchema);
