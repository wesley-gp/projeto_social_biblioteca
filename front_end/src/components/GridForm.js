import React from "react";
import styled from "styled-components";

// estilizaçoes
const Table = styled.table `
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    max-width: 1500px;
    margin: 20px auto;
    word-break: break-all;
   
    display: ${(props) => (props.display ? props.display : "flex")};
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
const GridForm = ({ loans, dados, display})=>{
      
    
    return (
        <Table display={display}>
            <Thead>
                <Tr>    
                    <Th>Nome</Th> 
                    <Th>Livro</Th> 
                    <Th alignCenter>Data</Th> 
                    <Th alignCenter>Dias</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    loans.map((item,i)=>(
                        <Tr key={i}>
                        <Td width="25%">{item.aluno_nome}</Td>
                        <Td >{item.livro_titulo}</Td>
                        <Td width="18%" alignCenter>
                          {item.data_emprestimo}
                        </Td>
                        <Td alignCenter width={"15%"}>{item.status_devolucao}</Td>
                        
                      </Tr> 
                    ))
                }
            </Tbody>
        </Table>

    )
        
    
}
//exportação
export default GridForm;
