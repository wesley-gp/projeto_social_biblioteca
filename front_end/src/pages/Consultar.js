// pages/Consultar.js
import React from "react";
import { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
// Estilizações
const Container = styled.div`
  width: 100%;
  max-width: 90%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: linear-gradient(180deg, #f8f8f8 50%, #ffffff 100%);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  input,
  select,
  button {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
  }
  li{
    padding: 15px;
    font-size: 15px;
    border-bottom: 1px solid #000000;

    
  }
  li:last-child{
    border: 0;
  }
  li:hover{
    background-color: #c7c7c7;
  }
`;

const Title = styled.h1`
  color: #228b22; /* Verde harmonioso */
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;

`
// Remove acentos de uma string
function removerAcentos(texto) {
  return texto ? texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';
}
// Página Consultar
const Consultar = () => {
  const [dados, setDados] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [sugestoes, setSugestoes] = useState([]);
  const [detalhes, setDetalhes] = useState(null);

  // Carrega os dados ao montar o componente
  useEffect(() => {
    axios.get('http://localhost:8800/search')
      .then(res => setDados(res.data))
      .catch(err => console.error('Erro ao carregar dados:', err));
  }, []);

 
 // Filtra sugestões e controla exibição de detalhes
useEffect(() => {
  if (filtro) {
    const textoFiltrado = removerAcentos(filtro.toLowerCase());
    const resultados = dados.filter(item => {
      const alunoCorrespondente = item.aluno_nome && 
        removerAcentos(item.aluno_nome.toLowerCase()).includes(textoFiltrado);

      const livroCorrespondente = item.livro_titulo && 
        removerAcentos(item.livro_titulo.toLowerCase()).includes(textoFiltrado);

      return alunoCorrespondente || livroCorrespondente;
    });
    setSugestoes(resultados);
    setDetalhes(null);  
  } else {
    setSugestoes([]);
  }
}, [filtro, dados]);


  // Exibe detalhes do item selecionado
  const renderDetalhes = (item) => {
    if (item.aluno_nome) {
      setDetalhes({
        tipo: 'Aluno',
        nome: item.aluno_nome,
        matricula: item.aluno_matricula,
        turma: item.aluno_turma,
        status: `Livro Emprestado: ${item.tem_livro_emprestado ? 'Sim' : 'Não'}`,
        id: item.aluno_id
      });
    } else if (item.livro_titulo) {
      setDetalhes({
        tipo: 'Livro',
        titulo: item.livro_titulo,
        autor: item.livro_autor,
        status: `Emprestado: ${item.livro_emprestado ? 'Sim' : 'Não'}`,
        id: item.livro_id
      });
    }
    setFiltro('');  // Limpa o input
    setSugestoes([]);  // Esconde sugestões
  };

  return (
    <>
      <Container>
        <Title>Consulta</Title>
        <input
          type="text"
          placeholder="Pesquisar Alunos ou Livros..."
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />
        <Div>


          {sugestoes.length > 0 && (
            <ul>
              {sugestoes.map(item => (
                <li
                  key={item.aluno_id || item.livro_id}
                  onClick={() => renderDetalhes(item)}
                >
                  {item.aluno_nome || item.livro_titulo}
                </li>
              ))}
            </ul>
          )}

          {detalhes && (
            <div className="detalhes">
              <h3>Informações Detalhadas</h3>
              <p><strong>Tipo:</strong> {detalhes.tipo}</p>
              {detalhes.tipo === 'Aluno' ? (
                <>
                  <p><strong>Nome:</strong> {detalhes.nome}</p>
                  <p><strong>Matrícula:</strong> {detalhes.matricula}</p>
                  <p><strong>Turma:</strong> {detalhes.turma}</p>
                  <p><strong>Status:</strong> {detalhes.status}</p>
                  <p><strong>ID:</strong> {detalhes.id}</p>
                </>
              ) : (
                <>
                  <p><strong>Título:</strong> {detalhes.titulo}</p>
                  <p><strong>Autor:</strong> {detalhes.autor}</p>
                  <p><strong>Status:</strong> {detalhes.status}</p>
                  <p><strong>ID:</strong> {detalhes.id}</p>
                </>
              )}
            </div>
          )}
        </Div>
      </Container>

    </>
  );
}

export default Consultar;
