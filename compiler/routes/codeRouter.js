import express from 'express'
import { runCode } from '../controllers/codeController.js';

// console.log("1");
const router=express.Router();
router.post("/run",runCode);

export default router;