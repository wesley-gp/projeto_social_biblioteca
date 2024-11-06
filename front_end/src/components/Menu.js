import React from "react";
import styled from "styled-components";



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
const Button = styled.button`
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
            <Button type="button">Consultar</Button> 
             <Button type="button">Inserir Alunos</Button>
             <Button type="button">Inserir Livros</Button>
            <Button type="button">Novo Empréstimos</Button>
        </Div>
             
        
    );
};

// exportação
export default Menu;