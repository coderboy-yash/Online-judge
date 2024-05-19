import express from 'express'
import { addProblem, getAllProblems, getProblemById } from '../controllers/problemController.js';
// console.log("1");
const router=express.Router();
router.post("/addproblem",addProblem);
router.get("/getallproblems",getAllProblems);
router.get("/:id",getProblemById);
export default router;