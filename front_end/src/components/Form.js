import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import axios from "axios";

// estilizações



const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: linear-gradient(180deg, #f8f8f8 50%, #ffffff 100%);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #228b22; /* Verde harmonioso */
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

const NewForm = styled.form`
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #228b22;

  label {
    display: block;
    font-size: 1rem;
    color: #555;
    margin-bottom: 8px;
  }

  input,
  select,
  button {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }

  button {
    background-color: #228b22; /* Verde */
    color: white;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: #1e7a1e;
    }
  }
`;

const Form = ({ formType }) => {
  //usesStates
  const [formData, setFormData] = useState({});
  const [tituloLivro, setTituloLivro] = useState("");
  const [nomeAluno, setNomeAluno] = useState("");
  const [arrayItems, setArrayItems] = useState([]);
  const [inputTitulo, setInputTitulo] = useState("");
  const [inputAutor, setInputAutor] = useState("");

  const formConfigurations = {
    NovoEmprestimo: [
      { label: "ID do Livro", name: "idLivro" },
      { label: "ID do Aluno", name: "idAluno" },

    ],
    InserirAlunos: [
      { label: "Nome Completo", name: "nomeCompleto" },
      { label: "Turma", name: "turma" },
      { label: "Matrícula", name: "matricula" }
    ],
    InserirLivros: [
      { label: "Título do Livro", name: "tituloLivro" },
      { label: "Autor", name: "autor" }
    ],
    InserirLivrosRepetidos: [
      { label: "Quantidade de Livros", name: "numeroDeLivros" },
      { label: "Título do Livro", name: "tituloLivro" },
      { label: "Autor do Livro", name: "autor" },

    ],
    InserirLivrosDiferentes: [
      { label: "Titulo do Livro", name: "tituloLivro" },
      { label: "Autor do Livro", name: "autor" }
    ]
  };

  const fields = formConfigurations[formType] || [];

  // Atualiza o estado local com os valores dos campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //busca livros no servidor
  const fetchLivro = useCallback(async (idLivro) => {
    try {
      const { data } = await axios.get("http://localhost:8800/Livros");
      const livro = data.find((livro) => livro.id === parseInt(idLivro, 10));
      return livro ? livro.titulo : "Livro não encontrado";
    } catch (error) {
      console.error("Erro ao buscar título do livro:", error);
      return "Erro ao buscar título do livro";
    }
  }, []);

  const fetchAluno = useCallback(async (idAluno) => {
    try {
      const { data } = await axios.get("http://localhost:8800/alunos");
      const aluno = data.find((aluno) => aluno.id === parseInt(idAluno, 10));
      return aluno ? aluno.nome : "Aluno não encontrado";
    } catch (error) {
      console.error("Erro ao buscar nome do aluno:", error);
      return "Erro ao buscar nome do aluno";
    }
  }, []);
  // Busca o título do livro quando o ID do livro muda
  useEffect(() => {
    const fetchData = async () => {
      if (!formData.idLivro) {
        setTituloLivro(""); // Limpa o título se o ID do livro estiver ausente
      }

      if (!formData.idAluno) {
        setNomeAluno(""); // Limpa o nome se o ID do aluno estiver ausente
      }

      // Continua para buscar dados somente se pelo menos um ID estiver presente
      if (!formData.idLivro && !formData.idAluno) {
        return;
      }
      try {//tenta pegar os valores dos Form, caso contrario deixa ""
        const [tituloLivro, nomeAluno] = await Promise.all([
          formData.idLivro ? fetchLivro(formData.idLivro) : "",
          formData.idAluno ? fetchAluno(formData.idAluno) : "",
        ]);

        setTituloLivro(tituloLivro);
        setNomeAluno(nomeAluno);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };


    fetchData();

  }, [formData.idLivro, formData.idAluno, fetchAluno, fetchLivro]); // O efeito roda sempre que `idLivro` ou `idAluno` muda
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    const envioData = formType === "InserirLivrosDiferentes"
  ? { formattedArray: arrayItems }
  : { formData };
    try {
      console.log(formData)
      console.log(formType)
      await axios.post('http://localhost:8800/salvar', {
        formType,
        ...envioData,
      }).then(() => {
        alert("Dados salvos")
        setFormData({});
        setArrayItems([]);
      });

    } catch (error) {
      // Captura a mensagem específica do backend
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Erro: ${error.response.data.error}`);
      } else {
        console.error('Erro inesperado:', error);
        alert('Erro ao salvar os dados. Tente novamente mais tarde.');
      }
    }
  };

  //adciona lista de itens na livros diferentes
  const handleAddItem = () => {
    if (inputTitulo.trim() && inputAutor.trim()) {
      const novoItem = `${inputTitulo}:${inputAutor}`;
      setArrayItems([...arrayItems, novoItem]);
      setInputTitulo("");
      setInputAutor("");
    }
    else{
      alert("Preencha todos os campos para adicionar um livro.");
      return;
    }
  };

  if (formType === "InserirLivrosDiferentes") {
    return (
      <Container>
         <Title>{formType}</Title>
        <NewForm onSubmit={handleSubmit}>
          <div>
            <label>Título do Livro</label>
            <input
              value={inputTitulo}
              onChange={(e) => setInputTitulo(e.target.value)}
              placeholder="Digite o título"
              
            />
          </div>

          <div>
            <label>Autor</label>
            <input
              value={inputAutor}
              onChange={(e) => setInputAutor(e.target.value)}
              placeholder="Digite o autor"
              
            />
          </div>

          <button type="button" onClick={handleAddItem}>
            Adicionar
          </button>

          {arrayItems.length > 0 && (
            <div>
              <h3>Livros Adicionados</h3>
              <ul>
                {arrayItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit">Salvar</button>
        </NewForm>
      </Container>
    )
  }
  return (

    <>
      <Container>
        <Title>{formType}</Title>
        <div>
          <h1>{tituloLivro}</h1>
          <h1>{nomeAluno}</h1>
        </div>

        <NewForm>
          {fields.map((field, index) => (
            <div key={index}>
              <label>{field.label}</label>
              <input
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <button type="submit" onClick={handleSubmit}>Salvar</button>
        </NewForm>
      </Container>
    </>
  );
};

export default Form;
