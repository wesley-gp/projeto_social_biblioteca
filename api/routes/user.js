import express from "express";
import  {getLoan}  from "../controllers/user.js";

const router = express.Router();

router.get("/", getLoan);

export default router;