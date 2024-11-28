import React, { useState, useEffect,useCallback } from "react";
import styled from "styled-components";
import axios from "axios";
// estilizações
const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;

`
const InputArea = styled.div`
    display: flex;
    flex-direction: column;

`
const Label = styled.label``;
const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;

`
const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
    
`

const Form = ({ formType }) => {
  const [formData, setFormData] = useState({});
  const [tituloLivro, setTituloLivro] = useState("");
  const [nomeAluno, setNomeAluno] = useState("");

  const formConfigurations = {
    NovoEmprestimo: [
      { label: "ID do Livro", name: "idLivro" },
      { label: "ID do Aluno", name: "idAluno" },
      
    ],
    InserirAlunos: [
      { label: "Nome Completo", name: "nomeCompleto" },
      { label: "Turma", name: "turma" },
      { label: "Matrícula", name: "matricula"}
    ],
    InserirLivros: [
      { label: "Título do Livro", name: "tituloLivro" },
    ],

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
    
  }, [formData.idLivro, formData.idAluno,fetchAluno,fetchLivro]); // O efeito roda sempre que `idLivro` ou `idAluno` muda
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    
    try {
      console.log(formData)
      console.log(formType)
      await axios.post('http://localhost:8800/salvar', {
        formType,
        formData,
      }).then(()=>{
        alert("Dados salvos")
        setFormData({}); 
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
  
  
  return (
    <>
      <InputArea>
        <h1>{tituloLivro}</h1>
        <h1>{nomeAluno}</h1>
      </InputArea>

      <FormContainer>
        {fields.map((field, index) => (
          <InputArea key={index}>
            <Label>{field.label}</Label>
            <Input
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
            />
          </InputArea>
        ))}

        <Button type="submit" onClick={handleSubmit}>Salvar</Button>
      </FormContainer>
    </>
  );
};

export default Form;
