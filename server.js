import app from "./index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 30000})
.then( ()=> console.log("Connected to MongoDB"))
.catch(err => console.error('Failed to connect to MongoDB: ', err));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});