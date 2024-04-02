import express from "express";
import dotenv from "dotenv";
// import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import habitRoutes from "./src/routes/habit.route.js";
import mongoose from "mongoose";

dotenv.config(); // Load environment variables from .env file

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then( ()=> console.log("Connected to MongoDB"))
.catch(err => console.error('Failed to connect to MongoDB: ', err));


// app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use('/', habitRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
