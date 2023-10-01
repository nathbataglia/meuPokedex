import React, { useState } from 'react';
import './App.css';

function App() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [idPokemon, setIdPokemon] = useState('');
  const [apelidoPokemon, setApelidoPokemon] = useState('');
  const [listaPokemons, setListaPokemons] = useState([]);

  const acessar = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/acessar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomeUsuario, senhaUsuario })
      });
      
      const dados = await resposta.json();
      if (dados.sucesso) setUsuarioLogado(true);
      else alert('Login ou senha incorretos');
    } catch (erro) {
      console.error('Erro ao acessar', erro);
    }
  };

  const registrarPokemon = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/registrar-pokemon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idPokemon, apelidoPokemon })
      });

      if (!resposta.ok) {
        const erro = await resposta.json();
        console.error('Erro ao registrar Pokemon:', erro.mensagem || 'Erro desconhecido');
        return;
      }
      
      const dados = await resposta.json();
      setListaPokemons(anterior => [...anterior, dados]);
    } catch (erro) {
      console.error('Erro ao registrar Pokemon', erro);
    }
  };

  return (
    <div className="App">
      <div className="formulario">
        {!usuarioLogado ? (
          <div id="formulario-acesso">
            <h2>Bem vindo à MeuPokedex!</h2>
            <h3>Faça seu login!</h3>
            <label>
              Login: <input type="text" value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} />
            </label>
            <label>
              Senha: <input type="password" value={senhaUsuario} onChange={(e) => setSenhaUsuario(e.target.value)} />
            </label>
            <button onClick={acessar}>Acessar</button>
          </div>
        ) : (
          <div id="formulario-pokemon">
            <h2>Cadastro de pokemons</h2>
            <label>
              Id do Pokemon: <input type="number" value={idPokemon} onChange={(e) => setIdPokemon(e.target.value)} />
            </label>
            <label>
              Apelido: <input type="text" value={apelidoPokemon} onChange={(e) => setApelidoPokemon(e.target.value)} />
            </label>
            <button onClick={registrarPokemon}>Registrar</button>
          </div>
        )}
      </div>

      {listaPokemons.length > 0 && (
        <table id="tabela-pokemons">
          <thead>
            <h2>Pokemons cadastrados</h2>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Apelido</th>
            </tr>
          </thead>
          <tbody id="corpo-tabela-pokemons">
            {listaPokemons.map((pokemon, indice) => (
              <tr key={indice}>
                <td><img src={pokemon.imagem} alt={pokemon.nome} /></td>
                <td>{pokemon.nome}</td>
                <td>{pokemon.apelidoPokemon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
