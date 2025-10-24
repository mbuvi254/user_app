import express from  'express'
import { PrismaClient } from "@prisma/client";


const app =express()
const client = new PrismaClient()

//Middleware to Parse JSON
app.use(express.json())


//Get Users
app.get("/users", async (req,res)=>{
    try{
        const users =await client.user.findMany();
            res.status(200).json(users);
        }catch(error){
            console.error(error);
            res.status(500).json({error: 'Something Went Wrong'})
        }
});

//Create New User
app.post("/users", async (req, res) => {
    try{
    const {firstName ,lastName,email}=req.body;
    const newUser = await client.user.create({
        data:{firstName : firstName,lastName:lastName,email:email}
    });
    res.status(201).json({
        message : 'User Created Successfully',
        data:newUser,
    });
}catch(error){
    console.error(error);
    res.status(500).json({error:'Something Went Wrong'});
}
});

//Get User By ID
app.get("users/:id",async (req,res)=>{
    try{
        const {id } =req.params;
        const user =client.user.findUnique({
            where:{
                id
            }
        });
        if(!user){
            res.status(404).json({message:'User Not Found'})
            return
        }
    }catch(error){
        res.status(500).json({message:"Something Went wrong"});
    }
});

//Updated User
app.patch("/users/:id", async (req,res)=>{
    try {
       const {id} = req.params;
       const updateUser = await client.user.update({
        where : {id},
        data:{firstName,lastName,email},
       });
       res.status(200).json({
        message: "User Updated Success",
        data:updateUser,
       });

    } catch(error){
        console.log("Whoops! an error occured",error)
        res.status(500).json({
            message:"Failed Updating User",
            error : error.message,
        });


    }

});

//Delete User
app.delete("/users/:id",async (req,res)=>{
    try{
        const {id} = req.params;
        const deleteUser = await client.user.update({
            where :{id},
            data:{isDeleted:true},
        });
        res.status(200).json({
            message: "User Marked as deleted successfully",
            user: deleteUser,
        });
    }catch(error){
        console.log("Error deleting user:" ,error);
        res.status(500).json({
            message:"Failed to delete user",
            error : error.message,
        });
    }

});

const port = 5000;
app.listen(port,()=>{
    console.log(` 🚀 Server running on port ${port} ...`)
})