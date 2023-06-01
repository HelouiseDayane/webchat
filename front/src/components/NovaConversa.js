import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const NovaConversa = () => {
  const history = useHistory();
  const [titulo, setTitulo] = useState('');

  const handleTituloChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Salvar o título no servidor (usando a sua API do Laravel)
      const response = await axios.post('http://localhost:8000/api/conversas_salvas', { titulo }); 
      const conversaId = response.data.id;

      // Redirecionar para a página do chat com o título e ID da conversa
      history.push(`/mensagens/${conversaId}`);
    } catch (error) {
      console.error('Erro ao salvar o título:', error);
    }
  };

 return (
    <div>
      <h1>Digite o título do chat:</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={handleTituloChange}
          required
        />
        <button type="submit">Salvar e Iniciar Nova Conversa</button>
      </form>
    </div>
  );
};

export default NovaConversa;