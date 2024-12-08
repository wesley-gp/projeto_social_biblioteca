import GlobalStyle from "../styles/global";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
//import Form from "./components/Form";
import Grid from "../components/Grid";
import Menu from "../components/Menu";
import axios from "axios";
import { useEffect, useState } from "react";

// Estilizações globais para usabilidade e harmonia
const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #2c5f2d; /* Verde escuro suave */
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StyledMenu = styled(Menu)`
  background-color: #ffa500; /* Laranja */
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      color: #2c5f2d; /* Verde escuro ao passar o mouse */
    }
  }
`;

const StyledGrid = styled(Grid)`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background-color: #fafafa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2c5f2d; /* Verde escuro */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #228b22; /* Verde vibrante */
  }
`;

const HomePage = () => {
  const [loans, setLoans] = useState([]);
  //const [onEdit] = useState(null);

  // Pegando o banco de dados pelo axios
  const getLoans = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setLoans(res.data);
    } catch (error) {
      toast.error("Erro ao carregar os dados: " + error.message);
    }
  };

  // Utilizando o banco de dados e colocando no setLoans
  useEffect(() => {
    getLoans();
  }, []);

  // O que vai retornar para o index
  return (
    <>
      <Container>
        <Title>Sistema Bibliotecário</Title>
        <StyledMenu />
        {/*<Button onClick={() => toast.info("Ação personalizada!")}>Adicionar Novo Livro</Button>*/}
        <StyledGrid loans={loans} />
      </Container>
      <ToastContainer autoClose={3000} position={"bottom-left"} />
      <GlobalStyle />
    </>
  );
};

export default HomePage;
