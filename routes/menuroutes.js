const express=require("express");
const router=express.Router();
const Menu=require("../menu");
//Menu post
router.post("/",async(req,res)=>{
    try{
        const data=req.body;
        const newmenu=new Menu(data);
        const savemenu=await newmenu.save();
        console.log("Menu Data Saved!!")
        res.status(200).json(savemenu);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})
//Menu get
router.get("/",async(req,res)=>{
    try{
        const data=await Menu.find();
        console.log("Menu data fetched successfully!");
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})
router.get("/:taste",async(req,res)=>{
    try{
        const tastetype=req.params.taste;
        if(tastetype=="sweet"|| tastetype=="spicy"|| tastetype=="sour"){
            const data=await Menu.find({taste:tastetype});
            console.log("Menu data fetched successfully!");
            res.status(200).json(data);
        }
        else{
            res.status(400).json({error:"Invalid taste type"});
        }        
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})
router.get("/:name",async(req,res)=>{
    try{
        const menuname=req.params.name;
        
        if (menuname=="Paneer Tikka" || menuname=="Dal Tadka" || menuname=="Gulab Jamun"){
            const data=await Menu.find({name:menuname});
            console.log("Menu data found!");
            res.status(200).json(data);
        }
        else{
            res.status(404).json({error: "Item not found!"});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})
router.put("/:id",async(req,res)=>{
    try{
        const menuid=req.params.id;
        const updatedata=req.body;
        const response=await Menu.findByIdAndUpdate(menuid,updatedata,{
            new:true,
        })
        if(!response){
            res.status(404).json({error:" Menu Item Not found"})
        }
        res.status(200).json(response);
        console.log("Sucsesfull Updation");
    }
    catch{
        res.status(500).json({error:"Internal server error"});
        console.log("Updation Failed")
    }
})
router.delete("/:id",async(req,res)=>{
    try{
        const menuid=req.params.id;
        const response=await Menu.findByIdAndDelete(menuid);
        if(!response){
            res.status(404).json({error:"Not found!! to delete!"})
        }
        res.send(200).json({message:"Deletioin Successful!"});
        console.log("Deleted Record!");
    }
    catch(err){
        console.log("Internal server error");
        res.send(500).json({error:"Internal Server error"});
    }
})
module.exports=router;