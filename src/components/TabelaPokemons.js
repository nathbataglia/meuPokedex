import React from 'react';

function TabelaPokemons({ listaPokemons }) {
  return (
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
        {listaPokemons.map((pokemon) => (
          <tr key={pokemon.id || pokemon.nome}>
            <td><img src={pokemon.imagem} alt={pokemon.nome} /></td>
            <td>{pokemon.nome}</td>
            <td>{pokemon.apelidoPokemon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TabelaPokemons;
