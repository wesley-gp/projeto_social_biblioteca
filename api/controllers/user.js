
import { db } from "../db.js";
// função responsavel por pegar os dados do Grid.js
export const getLoan = async (_, res) => {
  try {
    // Consulta com a ordenação por data_devolucao_prevista
    const [rows] = await db.query(`
          SELECT 
              e.id AS emprestimo_id, 
              a.nome AS aluno_nome, 
              a.matricula AS aluno_matricula, 
              l.titulo AS livro_titulo, 
              DATE_FORMAT(e.data_emprestimo, '%d-%m-%Y') AS data_emprestimo, 
              DATE_FORMAT(e.data_devolucao_prevista, '%d-%m-%Y') AS data_devolucao_prevista, 
              DATE_FORMAT(e.data_devolucao, '%d-%m-%Y') AS data_devolucao, 
              CASE  
                  WHEN e.extensao_pedida = TRUE THEN 'Sim' 
                  ELSE 'Não' 
              END AS extensao_pedida, 
              CASE 
                  WHEN e.data_devolucao IS NULL AND e.data_devolucao_prevista < CURDATE() THEN 'Atrasado' 
                  WHEN e.data_devolucao IS NOT NULL AND e.data_devolucao > e.data_devolucao_prevista THEN 'Devolvido Atrasado' 
                  WHEN e.data_devolucao IS NOT NULL AND e.data_devolucao <= e.data_devolucao_prevista THEN 'Devolvido Em Dia' 
                  ELSE 'Em Dia' 
              END AS status_devolucao, 
              IF(e.extensao_pedida = TRUE, DATEDIFF(e.data_devolucao_prevista, DATE_ADD(e.data_devolucao_prevista, INTERVAL 14 DAY)), 0) AS dias_extensao 
          FROM Emprestimo e 
          JOIN Aluno a ON e.aluno_id = a.id 
          JOIN Livro l ON e.livro_id = l.id
          ORDER BY e.data_devolucao_prevista;  -- Ordenando pela data_devolucao_prevista
      `);

    return res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

//função responsavel por pegar todos os emprestimos para verificação

export const getAllLoans = async (_, res,) => {

  try {
    const q = "SELECT * FROM emprestimo"
    const [rows] = await db.query(q)
    return rows
  } catch (error) {
    return res.json(error.message)
  }


}
export const getSearchItems = async (_, res) => {
  try {
    const qBook = `
      SELECT 
          L.id AS livro_id,
          L.titulo AS livro_titulo,
          L.autor AS livro_autor,
          CASE 
              WHEN EXISTS (
                  SELECT 1 
                  FROM Emprestimo E 
                  WHERE E.livro_id = L.id 
                    AND E.data_devolucao IS NULL
              ) THEN TRUE  
              ELSE FALSE 
          END AS livro_emprestado
      FROM Livro L;
    `
    const [rowsBook] = await db.query(qBook)
    const qAluno = `
      SELECT 
          A.id AS aluno_id,
          A.nome AS aluno_nome,
          A.matricula AS aluno_matricula,
          A.turma AS aluno_turma,
          CASE 
              WHEN EXISTS (
                  SELECT 1 
                  FROM Emprestimo E 
                  WHERE E.aluno_id = A.id 
                    AND E.data_devolucao IS NULL
              ) THEN TRUE  
              ELSE FALSE 
          END AS tem_livro_emprestado
      FROM Aluno A;
    `
    const [rowsAluno] = await db.query(qAluno);
    const rowsCombined = [...rowsBook, ...rowsAluno];
    return res.status(200).json(rowsCombined);
  } catch (error) {
    console.log(error.message)
    return res.status(500).json(error)
  }
}
// função responsavel por pegar todos os livros
export const getBooks = async (_, res,) => {

  try {
    const q = "SELECT * FROM livro"
    const [rows] = await db.query(q)
    return res.status(200).json(rows)
  } catch (error) {
    return res.json(error.message)
  }


}
export const getStudents = async (_, res,) => {

  try {
    const q = "SELECT * FROM aluno"
    const [rows] = await db.query(q)
    return res.status(200).json(rows)
  } catch (error) {
    return res.json(error.message)
  }


}
// função responsavel por pegar todos os alunos
export const getStudentsLoan = async () => {
  try {
    const q = "SELECT * FROM aluno WHERE aluno.id IN (SELECT aluno_id FROM emprestimo);";
    const [rows] = await db.query(q); // `rows` deve ser um array de alunos

    return rows; // Retorna o array de alunos
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    throw error; // Propaga o erro para o chamador
  }
};
// função utilizada para enviar dados para o banco de dados
export const alterationSet = async (req, res) => {
  try {
    //pegando o valor dos inputs 
    const { formType, formData, formattedArray } = req.body;
    //fazendo teste se todos os dados foram prenchidos
    if (!formType || (!formData && formType !== 'InserirLivrosDiferentes') || (formType === 'InserirLivrosDiferentes' && !formattedArray)) {
      return res.status(400).send({ error: 'Dados incompletos.' });
    }

    if (formType === 'InserirAlunos') {
      const rows = await getStudentsLoan(); //essa variavel vai ter todos os alunos cadastrados com emprestimo.

      //faz uma verificaçãp para saber se esse aluno já tem algum livro emprestado
      const alunoExistente = rows.find(aluno => aluno.matricula === formData.matricula);
      if (alunoExistente) {
        return res.status(400).send({ error: 'Esse aluno já tem um livro emprestado.' });
      }
      //vendo se existe campos vazios que são obrigatorios no InserirAlunos
      if (!formData.nomeCompleto || !formData.turma || !formData.matricula) {
        return res.status(400).send({ error: 'Campos obrigatórios ausentes para Inserir alunos.' });
      }
    }
    //vendo se existe campos vazios que são obrigatorios no InserirLivros
    if (formType == 'InserirLivros') {

      if (!formData.tituloLivro) {
        return res.status(400).send({ error: 'Campos obrigatórios ausentes para Inserir livros.' });
      }
    }
    if (formType == 'NovoEmprestimo') {
      const rows = await getAllLoans() // essa variavel vai ter todos os emprestimos  

      // verificação para ver se algum aluno ou livro já foi emprestado
      const emprestimoExistente = rows.find(
        emprestimo => emprestimo.aluno_id === formData.idAluno || emprestimo.livro_id === formData.idLivro
      );
      //retorno caso se já houver emprestimo  
      if (emprestimoExistente) {
        if (emprestimoExistente.aluno_id == formData.idAluno) {
          return res.status(400).send({ error: "Esse aluno já tem um empréstimo!" });
        } else {
          return res.status(400).send({ error: "Esse livro já foi emprestado!" });
        }
      }

      

      else {
        if (!formData.idAluno || !formData.idLivro) {
          return res.status(400).send({ error: 'Campos obrigatórios ausentes para Inserir Emprestimo.' });
        }
      }
      // fazer linha de verificação
    }
    // parte que analisa qual vai ser o comando passado ao banco de dados a partir do formType
    //formtype é um atributo do Form.js
    let values;
    let query = '';
    if (formType === 'InserirAlunos') {
      query = 'INSERT INTO aluno (nome, turma, matricula) VALUES (?, ?, ?)';
    } else if (formType === 'InserirLivros') {
      query = 'INSERT INTO livro (titulo) VALUES (?)';
    } else if (formType === 'NovoEmprestimo') {
      query = 'INSERT INTO Emprestimo (livro_id, aluno_id, data_emprestimo, data_devolucao_prevista) VALUES(?, ?, CURDATE(), date_add(curdate(), INTERVAL 14 DAY));';
    }
    else if (formType=== 'InserirLivrosRepetidos'){
      query = 'CALL InserirLivros(?, ?, ?)'
    }
    else if (formType==='InserirLivrosDiferentes'){
      query = 'CALL InserirVariosLivros(?)'
      values = [formattedArray.join(',')];
    }
    else {
      return res.status(400).send({ error: 'Tipo de formulário inválido.' });
    }
    // pegando os valores dados no formulario
    if(formType!=="InserirLivrosDiferentes"){
      values =Object.values(formData);
    }
    
    console.log(` valores do formData: ${values}`)
    try {
      await db.query(query, values, (err) => {
        //varias tentativas de pegar erros (sinceramente não sei qual que tá funcionando, tem um monte)
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).send({ err: 'Matrícula já cadastrada.' });
          }

          console.error('Erro ao salvar dados:', err);
          return res.status(500).send({ err: 'Erro ao salvar no banco de dados.' }

          );
        }
        return res.status(200).send('Dados salvos com sucesso!');
      }
      )


    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Erro no servidor:', details: error.message })
    }


  } catch (error) {
    console.error('Erro no servidor: ', error);
    res.status(500).send({ error: 'Erro no servidor.', details: error.message });
  }
}

