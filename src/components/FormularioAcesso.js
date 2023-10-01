import React, { useState } from 'react';

function FormularioAcesso({ setUsuarioLogado }) {
  const [credentials, setCredentials] = useState({ nomeUsuario: '', senhaUsuario: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const acessar = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/acessar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const dados = await resposta.json();
      if (dados.sucesso) {
        setUsuarioLogado(true);
      }
      else {
        alert('Login e/ou senha incorreto(s)');
      }

    } catch (erro) {
      console.error('Erro ao fazer login em MeuPokedex: ', erro);
    }
  };

  return (
    <div id="formulario-acesso">
      <h2>Bem vindo à MeuPokedex!</h2>
      <h3>Faça seu login!</h3>

      <label>Login: 
        <input type="text" name="nomeUsuario" value={credentials.nomeUsuario} onChange={handleChange} />
      </label>
      <label>Senha: 
        <input type="password" name="senhaUsuario" value={credentials.senhaUsuario} onChange={handleChange} />
      </label>

      <button onClick={acessar}>Acessar</button>
    </div>
  );
}

export default FormularioAcesso;
