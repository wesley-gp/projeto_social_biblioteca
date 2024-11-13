import React from "react";
import styled from "styled-components";

// estilizaçoes
const Table = styled.table `
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    max-width: 1200px;
    margin: 20px auto;
    word-break: break-all;

`
export const Thead = styled.thead``
export const Tbody = styled.tbody``;
export const Tr = styled.tr``

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};

`
export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) => (props.alignCenter ? "center" : "start")};
  width: ${(props) => (props.width ? props.width : "auto")};

`;
//widget que vai ser exportado
const Grid = ({ loans})=>{
      
    
    return (
        <Table>
            <Thead>
                <Tr>    
                    <Th>Nome</Th> 
                    <Th>Livro</Th> 
                    <Th alignCenter= "center">Data</Th> 
                    <Th alignCenter= "center">Dias</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    loans.map((item,i)=>(
                        <Tr key={i}>
                        <Td width="25%">{item.aluno_nome}</Td>
                        <Td >{item.livro_titulo}</Td>
                        <Td width="18%" alignCenter="center">
                          {item.data_emprestimo}
                        </Td>
                        <Td alignCenter="center" width={"15%"}>{item.status_devolucao}</Td>
                        
                      </Tr> 
                    ))
                }
            </Tbody>
        </Table>

    )
        
    
}
//exportação
export default Grid;
