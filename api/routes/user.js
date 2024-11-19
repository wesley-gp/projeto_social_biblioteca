import express from "express";
import  {getBooks, getLoan, setLoan}  from "../controllers/user.js";

const router = express.Router();

router.get("/", getLoan);
router.get("/addEmprestimo", setLoan)
router.get("/Livros", getBooks)

export default router;