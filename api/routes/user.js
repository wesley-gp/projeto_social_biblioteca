import express from "express";
import  {getLoan}  from "../controllers/user.js";

const router = express.Router();

router.get("/", getLoan);
router.get("/consultas:tipo", )

export default router;