
import { pool } from "../db.js";

export const getLoan = async (_, res) => {
    try {
        const [rows] = await pool.query("SELECT Alunos.nome AS aluno, Livros.titulo AS livro,Emprestimos.data_emprestimo FROM Emprestimos JOIN Alunos ON Emprestimos.aluno_id = Alunos.aluno_id JOIN Livros ON Emprestimos.livro_id = Livros.livro_id WHERE Emprestimos.data_devolucao IS NULL");
        return res.status(200).json(rows);
    } catch (error) {
        console.log(erro.message)
        return res.status(500).json({ error: error.message });
    }
};