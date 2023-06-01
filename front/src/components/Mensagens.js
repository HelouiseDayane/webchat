import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Mensagens = () => {
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/mensagens')
      .then(response => {
        setMensagens(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleEnviarMensagem = () => {
    if (novaMensagem.trim() !== '') {
      const mensagemEnviada = {
        id: Date.now(), // Gerando um ID único para a mensagem enviada
        conteudo: novaMensagem,
        enviada: true,
      };

      setMensagens([...mensagens, mensagemEnviada]);
      setNovaMensagem('');

      axios.post('http://localhost:8000/api/mensagems', { conteudo: novaMensagem })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div className="mensagens-container">
      <div className="mensagens">
        {mensagens.map(mensagem => (
          <div
            key={mensagem.id}
            className={`mensagem ${mensagem.enviada ? 'enviada' : 'recebida'}`}
          >
            {mensagem.conteudo}
          </div>
        ))}
      </div>
      <div className="envio-mensagem">
        <input
          type="text"
          value={novaMensagem}
          onChange={event => setNovaMensagem(event.target.value)}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleEnviarMensagem}>Enviar</button>
      </div>
    </div>
  );
};

export default Mensagens;
