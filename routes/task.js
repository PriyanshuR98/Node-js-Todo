import express from "express";
import { deleteTask, getMyTask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router= express.Router();

router.post("/new",isAuthenticated,newTask);

router.get("/my",isAuthenticated,getMyTask);


// make sure insko neeche rakho as / ke baad id consider krega .. agar isko new and my ke uper denge tou usko bhi id maan lega
router.route("/:id")
.put(isAuthenticated,updateTask)
.delete(isAuthenticated,deleteTask);

export default router;
