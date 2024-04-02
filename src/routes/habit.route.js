import express from "express";
const router = express.Router();
import * as habitController from '../controllers/habit.controller.js';

router.get("/", habitController.home);

router.post('/addHabit', habitController.addHabit);

router.get("/delete/:id", habitController.deleteHabit);

router.get("/details/:id", habitController.details);

router.post("/update/:habitId/:id", habitController.updateStatus);

export default router;