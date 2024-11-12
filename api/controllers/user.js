
import { pool } from "../db.js";

export const getLoan = async (_, res) => {
    try {
        const [rows] = await pool.query("SELECT e.id AS emprestimo_id, a.nome AS aluno_nome, a.matricula AS aluno_matricula, l.titulo AS livro_titulo, DATE_FORMAT(e.data_emprestimo, \'%d-%m-%Y\') AS data_emprestimo, DATE_FORMAT(e.data_devolucao_prevista, \'%d-%m-%Y\') AS data_devolucao_prevista, DATE_FORMAT(e.data_devolucao, \'%d-%m-%Y\') AS data_devolucao, CASE  WHEN e.extensao_pedida = TRUE THEN \'Sim\' ELSE \'Não\' END AS extensao_pedida, CASE WHEN e.data_devolucao IS NULL AND e.data_devolucao_prevista < CURDATE() THEN \'Atrasado\' WHEN e.data_devolucao IS NOT NULL AND e.data_devolucao > e.data_devolucao_prevista THEN \'Devolvido Atrasado\' WHEN e.data_devolucao IS NOT NULL AND e.data_devolucao <= e.data_devolucao_prevista THEN \'Devolvido Em Dia\' ELSE \'Em Dia\' END AS status_devolucao, IF(e.extensao_pedida = TRUE, DATEDIFF(e.data_devolucao_prevista, DATE_ADD(e.data_devolucao_prevista, INTERVAL -14 DAY)), 0) AS dias_extensao FROM Emprestimo e JOIN   Aluno a ON e.aluno_id = a.id JOIN Livro l ON e.livro_id = l.id;");
        return res.status(200).json(rows);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message });
    }
};

export const dad = async (_, res) => {
    try {
        const [rows] = await pool.query("SELECT Livros.titulo, Alunos.nome AS aluno, Emprestimos.data_emprestimo, DATEDIFF(CURDATE(), Emprestimos.data_emprestimo) AS dias_emprestados, 14 - DATEDIFF(CURDATE(), Emprestimos.data_emprestimo) AS dias_restantes FROM     Emprestimos JOIN Livros ON Emprestimos.livro_id = Livros.livro_id JOIN Alunos ON Emprestimos.aluno_id = Alunos.aluno_id WHERE Emprestimos.data_devolucao IS NULL;");
        return res.status(200).json(rows);
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: error.message });
    }
};