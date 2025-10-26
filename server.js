import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const client = new PrismaClient();

//Cors
app.use(cors());

//Middleware to Parse JSON
app.use(express.json());

//Get Users
app.get("/users", async (req, res) => {
  try {
    const users = await client.user.findMany({
      where: { isDeleted: false },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
});

//Create New User
app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    //Add Validation to ensure all supplied
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newUser = await client.user.create({
      data: { firstName: firstName, lastName: lastName, email: email },
    });
    res.status(201).json({
      message: "User Created Successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something Went Wrong" });
  }
});

//Get User By ID
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await client.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something Went wrong" });
  }
});

//Updated User
app.patch("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const updateUser = await client.user.update({
      where: { id: String(id) },
      data: { firstName, lastName, email },
    });
    res.status(200).json({
      message: "User Updated Successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log("Whoops! an error occured", error);
    res.status(500).json({
      message: "Failed Updating User",
      error: error.message,
    });
  }
});

//Soft Delete User
app.delete("/users/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteUser = await client.user.update({
      where: { id },
      data: { isDeleted: true },
    });
    res.status(200).json({
      message: "User Soft Deleted successfully",
      user: deleteUser,
    });
  } catch (error) {
    console.log("Error deleting user:", error);
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
});

// //Hard Delete User
// app.delete("/users/:id",async (req,res)=>{
//     try{
//         const id = parseInt(req.params.id);
//         const user = await client.user.findUnique({ where: { id } });
//         if (!user) {
//         return res.status(404).json({ message: "User not found" });
//         }

//         const deleteUser = await client.user.delete({
//             where :{id},
//         });
//         res.status(200).json({
//             message: "User Hard Deleted successfully",
//             user: deleteUser,
//         });
//     }catch(error){
//         console.log("Error deleting user:" ,error);
//         res.status(500).json({
//             message:"Failed to delete user",
//             error : error.message,
//         });
//     }

// });

const port = 7000;
app.listen(port, () => {
  console.log(` 🚀 Server running on port ${port} ...`);
});
