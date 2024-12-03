// pages/NovoEmprestimo.js
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

const NovoEmprestimo = () => {
  const [formData, setFormData] = useState({
    alunoId: "",
    livroId: "",
    dataEmprestimo: "",
    dataDevolucao: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviando os dados do novo empréstimo para o servidor
      const response = await axios.post("http://localhost:8800/emprestimos", formData);
      if (response.status === 201) {
        toast.success("Empréstimo registrado com sucesso!");
        setFormData({ alunoId: "", livroId: "", dataEmprestimo: "", dataDevolucao: "" }); // Limpa o formulário
      }
    } catch (error) {
      toast.error("Erro ao registrar empréstimo. Tente novamente.");
    }
  };

  return (
    <Container>
      <Title>Novo Empréstimo</Title>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="alunoId">ID do Aluno</label>
        <input
          type="text"
          id="alunoId"
          name="alunoId"
          value={formData.alunoId}
          onChange={handleChange}
          required
        />

        <label htmlFor="livroId">ID do Livro</label>
        <input
          type="text"
          id="livroId"
          name="livroId"
          value={formData.livroId}
          onChange={handleChange}
          required
        />

        <label htmlFor="dataEmprestimo">Data do Empréstimo</label>
        <input
          type="date"
          id="dataEmprestimo"
          name="dataEmprestimo"
          value={formData.dataEmprestimo}
          onChange={handleChange}
          required
        />

        <label htmlFor="dataDevolucao">Data de Devolução</label>
        <input
          type="date"
          id="dataDevolucao"
          name="dataDevolucao"
          value={formData.dataDevolucao}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrar Empréstimo</button>
      </Form>
    </Container>
  );
};

export default NovoEmprestimo;
