import GlobalStyle from "./styles/global";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Consultar from "./pages/Consultar";
import InserirAlunos from "./pages/InserirAlunos";
import InserirLivros from "./pages/InserirLivros";
import NovoEmprestimo from "./pages/NovoEmprestimo";
import HomePage from "./pages/HomePage";


function App() {

// o que vai retornar para o index
  return (
    <Router>
    
   
      <Routes>
        <Route path = "/" element= {<HomePage/>} />
        <Route path="/Consultar" element={<Consultar />} />
        <Route path="/InserirAlunos" element={<InserirAlunos />} />
        <Route path="/InserirLivros" element={<InserirLivros />} />
        <Route path="/NovoEmprestimo" element={<NovoEmprestimo />} />
      </Routes>
      <GlobalStyle/>
      </Router>
  );
}

export default App;
