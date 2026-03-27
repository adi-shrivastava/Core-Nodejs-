const express=require("express");
const router=express.Router();
const Person=require("../person");
//post person data
router.post("/",async(req,res)=>{
    try{
        const data=req.body;
        const newperson= new Person(data); //Creating new person for sending to DB
        const savedperson=await newperson.save(); //Save to DB
        console.log("Data Saved!!")
        res.status(200).json(savedperson); //Resonding with saved data
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})
// fetch person data!!
router.get("/",async(req,res)=>{
    try{
        const data=await Person.find();
        res.status(200).json(data);
        console.log("Data fetched successfully!");
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Internal Server Error"});
    }
})
//fetch person data based on work type
//parameterized url :work
router.get("/:work",async(req,res)=>{
    try{
        const worktype=req.params.work; //getting work type from url
        if(worktype=="Chef" || worktype=="Waiter" || worktype=="Manager"){
            const data =await Person.find({work:worktype});
            res.status(200).json(data);
            console.log(`Data fetched successfully for work type: ${worktype}`);
        }
        else{
            res.status(400).json({error:"Invalid work type"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
})
router.put("/:id",async(req,res)=>{
    try{
        const personid=req.params.id;
        const updatedata=req.body;
        const response=await Person.findByIdAndUpdate(personid,updatedata,{
            new:true,
            runValidators:true,
        });
        if(!response){
            res.status(404).json({error:"Person not found"});
        }
        res.status(200).json(response);
        console.log("Person data updated!!");
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
    
})
router.delete("/:id",async(req,res)=>{
    try{
        const personid=req.params.id;
        const response=await Person.findByIdAndDelete(personid);
        if(!response){
            res.status(404).json({error:"Person not found"});
        }
        console.log("Person data deleted successfully!");
        res.status(200).json({message:"Person data deleted successfully!"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
})
module.exports=router;