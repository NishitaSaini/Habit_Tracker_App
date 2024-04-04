import express from "express";
import dotenv from "dotenv";
// import bodyParser from 'body-parser';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import habitRoutes from "./src/routes/habit.route.js";


 // Load environment variables from .env file

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();





// app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use('/', habitRoutes);

export default app;
