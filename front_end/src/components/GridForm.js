import React from "react";
import styled from "styled-components";

// estilizaçoes
export const Div = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`
export const Search = styled.input`
    max-width: 600px;

`
//widget que vai ser exportado
const GridForm = ()=>{
      
    
    return (
       
        <Div>
            <Search type="search"/>
            <ul>
                <li>
                    <p>Nome</p>
                    <p>Turma</p>
                </li>
            </ul>
        </Div>
      

    )
        
    
}
//exportação
export default GridForm;
