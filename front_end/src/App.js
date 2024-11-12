import GlobalStyle from "./styles/global";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components"
//import Form from "./components/Form";
import Grid from "./components/Grid"
import Menu from "./components/Menu"
import axios from "axios"
import { useEffect, useState } from "react";

//estilizações
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const Title = styled.h2``

function App() {
  const [loans, setLoans] = useState([]);
  //const [onEdit] = useState(null);
  //pegando o banco de dados pelo axios
  const getLoans = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setLoans(res.data.sort((a, b) => (a.data_devolucao_prevista > b.data_devolucao_prevista ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };
  //utilizando o banco de dados e colocando no setLoans (eu acho)
  useEffect(() => {
    getLoans();
  }, [setLoans]);


// o que vai retornar para o index
  return (
    <>
    
    <Container>      
      <Title>Teste</Title>
      <Menu/>
      <Grid loans= {loans}/>
    </Container>
      <ToastContainer autoClose={3000} position={"bottom-left"}/>
      <GlobalStyle/>
    </>
  );
}

export default App;
