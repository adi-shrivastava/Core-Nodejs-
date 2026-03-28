const express=require("./node_modules/express");
const app=express();
const db=require("./db");  
const Person=require("./person");
const Menu=require("./menu");
const passport=require("./auth");

const {jwtauthmiddleware,tokengeneration}=require("./../jwt");

const bodyParser=require("body-parser");
app.use(bodyParser.json()) //req.body parser middleware
const logrequest=(req,res,next)=>{
    console.log(`${new Date().toLocaleString()} Request made to ${req.originalUrl}`);
    next();
}
const localauthmiddleware=passport.authenticate("local",{session:false});
app.use(logrequest); 
app.use(passport.initialize());

app.get("/",(req,res)=>{
    res.send("Welcome to the Home Page!");
})
//Import person routes
const personroutes=require("./routes/personroutes");
//Use person routes with /person prefix for endpoints of person
app.use("/person",,personroutes);

//Vice versa for menu routes
const menuroutes=require("./routes/menuroutes");
app.use("/menu",localauthmiddleware,menuroutes);


app.listen(3000,()=>{console.log("Server is live and running on 3000 port! ")});