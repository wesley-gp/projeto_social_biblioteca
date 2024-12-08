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

  const setGrid = async()=>{
    try {
        const res = await axios.get("http://localhost:8800/GridForm");
        return res.data
      } catch (error) {
        console.log(error);
      }
    };




//widget que vai ser exportado
const GridForm = ()=>{
      
    
    return (
       <>
        <Div>
            <Search type="search"/>
            <ul>
                <li>
                    <p>Nome</p>
                    <p>Turma</p>
                </li>
            </ul>
        </Div>
        <Div>
            
        </Div>
        </>

    )
        
    
}
//exportação
export default GridForm;
