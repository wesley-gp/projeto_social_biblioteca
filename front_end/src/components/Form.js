import React, {useRef} from "react";
import styled from "styled-components";

//estilizaçoes
const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;

`
const InputArea = styled.div`
    display: flex;
    flex-direction: column;

`
const Label = styled.label``;
const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;

`
const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;

`
// widget que vai ser exportado
const Form = () => {
    const ref = useRef()
    
    return(  
        <FormContainer ref={ref}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome"/>
            </InputArea>
            <InputArea>
                <Label >Turma</Label>
                <Input name= "Turma"></Input>
            </InputArea>
            <InputArea>
                <Label>Livro</Label>
                <Input name= "Livro"></Input>
            </InputArea>

            <Button type="submit">Analisar</Button>
        </FormContainer>
    );
};

//importação
export default Form;