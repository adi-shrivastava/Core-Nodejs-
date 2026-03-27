const passport=require("passport");
const LocalStrategy=require("passport-local").Strategy;
const Person=require("./person");
const Menu=require("./menu");
passport.use(new LocalStrategy(async(username,password,done)=>{
    try{
        // console.log("Received Credentials:",{username,password});
        const user=await Person.findOne({username:username});
        if(!user){
            return done(null,false,{message:"Incorrect username"});
        }
        const ispass= await user.comparepassword(password);
        if(ispass){
            return done(null,user);
        }
        else{
            return done(null,false,{message:"Incorrect password"});
        }
    }
    catch(err){
        return done(err);
    }
}))
// passport.use(new LocalStrategy(async(username,password,done)=>{
//     try{
//         console.log("Received Credentials for menu: ",{username,password});
//         const user=await Menu.findOne({username:username,password:password});
//         if(!user){
//             return done(null,false,{message:"Incorrect username"});
//         }
//         if(user.password===password ? true:false){
//             return done(null,user);
//         }
//         else{
//             return done(null,false,{message:"Incorrect password"});
//         }
    
//     }
//     catch(err){
//         return done(err);
//     }
// }))
module.exports=passport;