// pages/InserirLivros.js
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

// Estilizações
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

const Form = styled.form`
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

const InserirLivros = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    editora: "",
    anoPublicacao: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviando os dados para o servidor
      const response = await axios.post("http://localhost:8800/livros", formData);
      if (response.status === 201) {
        toast.success("Livro inserido com sucesso!");
        setFormData({ titulo: "", autor: "", editora: "", anoPublicacao: "" }); // Limpa o formulário
      }
    } catch (error) {
      toast.error("Erro ao inserir livro. Tente novamente.");
    }
  };

  return (
    <Container>
      <Title>Inserir Livros</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          required
        />

        <label htmlFor="autor">Autor</label>
        <input
          type="text"
          id="autor"
          name="autor"
          value={formData.autor}
          onChange={handleChange}
          required
        />


        <label htmlFor="anoPublicacao">Ano de Publicação</label>
        <input
          type="number"
          id="anoPublicacao"
          name="anoPublicacao"
          value={formData.anoPublicacao}
          onChange={handleChange}
          required
        />

        <button type="submit">Inserir Livro</button>
      </Form>
    </Container>
  );
};

export default InserirLivros;
