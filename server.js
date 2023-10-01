const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const aplicativo = express();
aplicativo.use(bodyParser.json());
aplicativo.use(cors());

let listaUsuarios = [{ nomeUsuario: 'nath', senhaUsuario: '123' }];
let listaPokemons = [];

aplicativo.post('/acessar', (req, res) => {
    const { nomeUsuario, senhaUsuario } = req.body;
    if(!nomeUsuario || !senhaUsuario) return res.status(400).send({ 
        erro: 'Preencha os campos de Login e Senha' 
    });
    
    const usuario = listaUsuarios.find(u => u.nomeUsuario === nomeUsuario && u.senhaUsuario === senhaUsuario);
    if(usuario) res.send({ 
        sucesso: true 
    });

    else res.status(401).send({ 
        sucesso: false, erro: 'Campo Login e/ou Senha inválido(s)' 
    });
});

aplicativo.post('/registrar-pokemon', async (req, res) => {
    try {
        const { idPokemon, apelidoPokemon } = req.body;
        if(!idPokemon || !apelidoPokemon) return res.status(400).send({ 
            erro: 'Preencha os campos Id do Pokemon e Apelido' 
        });

        const pokemonJaExiste = listaPokemons.find(p => p.apelidoPokemon === apelidoPokemon);
        if(pokemonJaExiste) return res.status(400).send({ 
            erro: 'Este apelido já está sendo usado por outro pokemon cadastrado' 
        });

        const resposta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        const dadosPokemon = {
            nome: resposta.data.name,
            imagem: resposta.data.sprites.front_default,
            apelidoPokemon
        };
        
        listaPokemons.push(dadosPokemon);
        res.send(dadosPokemon);
    } catch (erro) {
        res.status(400).send({ 
            erro: 'Erro no registro do Pokemon' 
        });
    }
});

aplicativo.get('/listar-pokemons', (req, res) => res.send(listaPokemons));

aplicativo.listen(3000, () => console.log('Servidor iniciado'));
