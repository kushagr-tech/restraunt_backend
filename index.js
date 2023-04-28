const express=require("express");
const bodyParser= require("body-parser");
const mongoose= require("mongoose");
var cors = require('cors')

require("dotenv").config();



const app=express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 7000;


//db connection
const connect=  async()=>{
    try {
        const connection= await mongoose.connect(process.env.MONGODBURL, 
        {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected");
    } catch (error) {
        console.log(error);
        console.log("errrorr!!!!!!")
    }
}
connect()

//importing routes
const userRoutes=require("./routes/user.route");
// const teamMemberRoute=require("./router/teamMember.route");

// //routes
app.use(userRoutes);
// app.use(teamMemberRoute);





app.listen(port,()=>{
    console.log(`server is up on ${port}`);
})

