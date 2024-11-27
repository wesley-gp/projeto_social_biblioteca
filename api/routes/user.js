import express from "express";
import  {getBooks, getLoan, alterationSet, getAllData}  from "../controllers/user.js";

const router = express.Router();

router.get("/", getLoan);
router.get("/Livros", getBooks)
router.post("/salvar", alterationSet)
router.get("/verificador", getAllData)

export default router;