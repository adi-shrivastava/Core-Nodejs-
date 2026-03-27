const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true},
    age:{
        type:Number
    },
    mobile:{
        type:String
    },
    city:{
        type:String
    },
    work:{
        type:String,
        enum:["Chef","Waiter","Manager"]
    },
    username:{
        required:true,
        type:String,
    },
    password:{
        required:true,
        type:String,
    }
});
personSchema.pre("save",async function(next){
    const person=this;
    //hash if changed password
    if(!person.isModified("password")) return next();
    try{
        //hash pass generation
        const salt=await bcrypt.genSalt(10);
        //hashing password
        const hashedpassword=await bcrypt.hash(person.password,salt);
        //overwrite the existing password with hashed password
        person.password=hashedpassword;
       
    }
    catch(err){
        throw err;
    }
})
personSchema.methods.comparepassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}
//Model made
const Person=mongoose.model("Person",personSchema);
//Exported to server.js
module.exports=Person;