// pages/InserirAlunos.js
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "../components/Form";

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

const InserirAlunos = () => {
  return (
    <Form formType="InserirAlunos"/>
  );
};

export default InserirAlunos;
