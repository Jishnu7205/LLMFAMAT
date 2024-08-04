const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cors = require('cors');

const app = express();
dotenv.config();


// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use(cors());


//DB Connection 
const MONGO_URL = process.env.MONGO_URL;
async function dbconnection(){
    await mongoose.connect(MONGO_URL);
}
dbconnection()
    .then(() => {
        console.log("DB connected successfully");
    })
    .catch((err) =>{
        console.error(`Error connecting to DB : ${err}`);
    });




app.get("/", (req, res) => {
    res.send("Hello World");
});


app.use("/AMS", userRoutes);


// const Port = process.env.PORT || 8000;
app.listen(8080, () => {
    console.log(`Server is running at http://localhost:${8080}`);
});