import express from 'express'
import { addProblem } from '../controllers/problemController.js';
// console.log("1");
const router=express.Router();
router.post("/addproblem",addProblem);
export default router;