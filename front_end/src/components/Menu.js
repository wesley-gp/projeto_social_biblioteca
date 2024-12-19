import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Div = styled.div`
  display: flex;
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
`;

const ButtonLink = styled(Link)`
  margin: 0;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  min-width: 150px;
  &:hover {
    background-color: #1a4278;
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 10px 10px;
`;

const DropdownButton = styled(Link)`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  text-decoration: none;
  text-align: center;
  display: inline-block;
  min-width: 150px;
  &:hover {
    background-color: #1a4278;
  }
`;

const DropdownMenu = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  min-width: 200px;
  z-index: 1;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 10px;
  color: #000;
  text-decoration: none;
  width: 100%;
  border: 1px solid transparent;
  &:hover {
    background-color: #f0f0f0;
    border: 1px solid #aaa;
  }
`;

const Menu = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <Div>
      <ButtonContainer>
        <ButtonLink to="/Consultar">Consultar</ButtonLink>
      </ButtonContainer>
      <ButtonContainer>
        <DropdownButton as="a" onClick={toggleDropdown}>Inserir</DropdownButton>
        <DropdownMenu show={showDropdown}>
          <DropdownItem to="/InserirAlunos">Inserir Alunos</DropdownItem>
          <DropdownItem to="/InserirLivros">Inserir Livros</DropdownItem>
          <DropdownItem to="/InserirLivroRepetido">Inserir Livros Repetidos</DropdownItem>
          <DropdownItem to="/InserirLivrosDiferentes">Inserir Livros Diferentes</DropdownItem>
        </DropdownMenu>
      </ButtonContainer>
      <ButtonContainer>
        <ButtonLink to="/NovoEmprestimo">Novo Empréstimo</ButtonLink>
      </ButtonContainer>
    </Div>
  );
};

export default Menu;
