import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Conversas = () => {
  const [conversas, setConversas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/conversas')
      .then(response => {
        setConversas(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Conversas</h2>
      <ul>
        {conversas.map(conversa => (
          <li key={conversa.id}>{conversa.titulo}</li>
        ))}
      </ul>
    </div>
  );
};

export default Conversas;
