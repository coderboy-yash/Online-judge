import express from 'express'
import { runCode, submitCode } from '../controllers/codeController.js';

// console.log("1");
const router=express.Router();
router.post("/run",runCode);
router.post("/submit",submitCode);

export default router;