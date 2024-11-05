
import { pool } from "../db.js";

export const getUsers = async (_, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM emprestimos WHERE livro_id = ? AND data_devolucao IS NULL", [1]);
        return res.status(200).json(rows);
    } catch (error) {
        console.log(erro.message)
        return res.status(500).json({ error: error.message });
    }
};