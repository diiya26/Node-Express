const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const  jwt=require("jsonwebtoken");
const User=require("./models/User");

const app=express();
app.use(express.json());
const SECRET_KEY="mysecretkey";
// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/jwt_auth")
    .then(() =>{
        console.log("MongoDB connected");
    })
    .catch((error) =>{
        console.log(error);
    });
// REgister
app.post("/register", async (req, res) =>{
    try {
        const { name, email, password } =req.body;
        // Check existing user
        const existingUser=await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message:"Email already registered"
            });
        }
        // Hash password
        const hashedPassword=await bcrypt.hash(password, 10);
        // Create the user
        const user=new User({
            name,
            email,
            password:hashedPassword
        });
        await user.save();
        res.status(201).json({
            message:"Registration successful"
        });
    } catch (error) {
        res.status(500).json({
            message:"Server error"
        });
    }
});
// login
app.post("/login", async (req, res) =>{
    try {
        const { email, password } =req.body;
        // find the user is availbale or not
        const user=await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message:"Invalid email or password"
            });
        }
        // Comparing the password
        const isPasswordValid=await bcrypt.compare(
            password,
            user.password
        );
        if (!isPasswordValid) {
            return res.status(401).json({
                message:"Invalid email or password"
            });
        }
        // Generate JWT
        const token= jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            SECRET_KEY,
            {
                expiresIn:"1h"
            }
        );
        res.json({
            message:"Login successful",
            token:token
        });
    } catch (error) {
        res.status(500).json({
            message:"Server error"
        });
    }
});
// Start server
app.listen(3000, () =>{
    console.log("Server running on http://localhost:3000");
});

