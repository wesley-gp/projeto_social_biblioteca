import React, { useState, useEffect } from "react";
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

  const formConfigurations = {
    NovoEmprestimo: [
      { label: "ID do Livro", name: "idLivro" },
      { label: "ID do Aluno", name: "idAluno" },
      { label: "Data de Empréstimo", name: "dataEmprestimo" },
    ],
    InserirAlunos: [
      { label: "Nome Completo", name: "nomeCompleto" },
      { label: "Turma", name: "turma" },
      { label: "Matrícula", name: "matricula"}
    ],
    InserirLivros: [
      { label: "Título do Livro", name: "tituloLivro" },
      { label: "Autor", name: "autor" },
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

  // Busca o título do livro quando o ID do livro muda
  useEffect(() => {
    const fetchTituloLivro = async () => {
      if (!formData.idLivro) {
        setTituloLivro(""); // Limpa o título se o campo ID estiver vazio
        return;
      }
  
      try {
        const res = await axios.get(`http://localhost:8800/Livros`);
        const livro = res.data.find(
          (livro) => livro.id === parseInt(formData.idLivro, 10)
        );
  
        if (livro) {
          setTituloLivro(livro.titulo);
        } else {
          setTituloLivro("Livro não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar título do livro:", error); // Registra o erro
        setTituloLivro("Erro ao buscar livro" + error);
      }
    };
  
    fetchTituloLivro();
  }, [formData.idLivro]); // O efeito roda sempre que `idLivro` muda
  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
  
    try {
      await axios.post('http://localhost:8800/salvar', {
        formType,
        formData,
      }).then(()=>{
        setFormData({}); 
      });
      
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
      alert('Erro ao salvar os dados')
    }
  };
  
  
  return (
    <>
      <InputArea>
        <h1>{tituloLivro}</h1>
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
