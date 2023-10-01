import React, { useState } from 'react';

import './App.css';

import FormularioAcesso from './components/FormularioAcesso';
import FormularioPokemon from './components/FormularioPokemon';
import TabelaPokemons from './components/TabelaPokemons';

function App() {

  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [listaPokemons, setListaPokemons] = useState([]);
  
  const adicionarPokemon = (pokemon) => {
    setListaPokemons(anterior => [...anterior, pokemon]);
  };

  return (
    <div className="App">
      <div className="formulario">
        {/* if ternário pra verificar se o usuário está logado */}
        {!usuarioLogado ? ( <FormularioAcesso setUsuarioLogado={setUsuarioLogado} /> ) : ( <FormularioPokemon adicionarPokemon={adicionarPokemon} />)}
      </div>
      {listaPokemons.length > 0 && <TabelaPokemons listaPokemons={listaPokemons} />}
    </div>
  );
  
}

export default App;
