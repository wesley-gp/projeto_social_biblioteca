import React from "react";
import styled from "styled-components";


const Table = styled.table `
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;

`
export const Thead = styled.thead`

`
export const Tr = styled.tr``

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;


`


const Grid = ()=>{
    return (
        <Table>
            <Thead>
                <Tr>    
                    <Th>Nome</Th> 
                    <Th>Livro</Th> 
                    <Th>Data</Th> 
                </Tr>
            </Thead>
        </Table>

    )
        
    
}

export default Grid;
