import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Div principal, card
const Div = styled.div`
    align-items: flex-end;
    
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 1500px;
    line-break: strict;
    word-break: keep-all;
`
// Button
const ButtonLink = styled(Link)`
    margin: 0;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    
    text-decoration: none;
    :hover{
        background-color: #0d2a52;
    }
`
const ButtomContainer = styled.div`
    display: inline-block;
    height: 30px;
    margin: 10px 10px;
`

// Widget que vai ser exportado
const Menu = () => {
    
    return(  
    <Div>
      <ButtomContainer>
          <ButtonLink to="/Consultar">Consultar</ButtonLink>
      </ButtomContainer>
      <ButtomContainer>
          <ButtonLink to="/InserirAlunos">Inserir Alunos</ButtonLink>
      </ButtomContainer>
      <ButtomContainer>
          <ButtonLink to="/InserirLivros">Inserir Livros</ButtonLink>
      </ButtomContainer>
      <ButtomContainer>
          <ButtonLink to="/NovoEmprestimo">Novo Empréstimo</ButtonLink>
      </ButtomContainer>
    </Div>
  
    );
};

// exportação
export default Menu;