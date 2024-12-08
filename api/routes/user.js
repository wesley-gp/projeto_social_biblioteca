import express from "express";
import  {getBooks, getLoan, alterationSet,  getStudents, getSearchItems}  from "../controllers/user.js";

const router = express.Router();

router.get("/", getLoan);
router.get("/Livros", getBooks)
router.post("/salvar", alterationSet)
router.get("/alunos", getStudents)
router.get("/search", getSearchItems)

export default router;