import React, { useState } from 'react';

function FormularioPokemon({ adicionarPokemon }) {
  const [pokemon, setPokemon] = useState({ idPokemon: '', apelidoPokemon: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPokemon(prev => ({ ...prev, [name]: value }));
  };

  const registrarPokemon = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/registrar-pokemon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pokemon)
      });

      if (!resposta.ok) throw await resposta.json();

      adicionarPokemon(await resposta.json());

    } catch (erro) {
      console.error('Erro ao registrar Pokemon: ', erro.mensagem || erro);
    }
  };

  return (
    <div id="formulario-pokemon">
      <h2>Cadastro de pokemons</h2>

      <label>Id do Pokemon: 
        <input type="number" name="idPokemon" value={pokemon.idPokemon} onChange={handleChange} />
      </label>
      <label>Apelido: 
        <input type="text" name="apelidoPokemon" value={pokemon.apelidoPokemon} onChange={handleChange} />
      </label>

      <button onClick={registrarPokemon}>Cadastrar</button>
    </div>
  );
}

export default FormularioPokemon;
