import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Consultar from "../pages/Consultar";
import InserirAlunos from "../pages/InserirAlunos";
import InserirLivros from "../pages/InserirLivros";
import NovoEmprestimo from "../pages/NovoEmprestimo";

// Div principal, card
const Div = styled.div`
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;

`
// Button
const ButtonLink = styled(Link)`
    margin: auto 10px;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;

`
// Widget que vai ser exportado
const Menu = () => {
    
    return(  
        <Div>
      <ButtonLink to="/Consultar">Consultar</ButtonLink>
      <ButtonLink to="/InserirAlunos">Inserir Alunos</ButtonLink>
      <ButtonLink to="/InserirLivros">Inserir Livros</ButtonLink>
      <ButtonLink to="/NovoEmprestimo">Novo Empréstimo</ButtonLink>
    </Div>
  
    );
};

// exportação
export default Menu;