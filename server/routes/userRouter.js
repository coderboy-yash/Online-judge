import express from 'express'
import { login } from '../controllers/loginController.js';
// console.log("1");
const router=express.Router();
router.post("/login",login);
export default router;