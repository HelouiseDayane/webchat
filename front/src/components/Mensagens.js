import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Mensagens = () => {
  const { id_conversa } = useParams();
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [conversaFinalizada, setConversaFinalizada] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/mensagens/${id_conversa}`)
      .then(response => {
        setMensagens(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id_conversa]);

  const handleEnviarMensagem = () => {
    if (novaMensagem.trim() !== '') {
      const mensagemEnviada = {
        id: Date.now(),
        conteudo: novaMensagem,
        enviada: true,
        id_conversa: id_conversa,
      };

      setMensagens([...mensagens, mensagemEnviada]);
      setNovaMensagem('');

      axios
        .post('http://localhost:8000/api/mensagens', mensagemEnviada)
        .then(response => {
          console.log(response.data); // Exibe a resposta da API (opcional)
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleFinalizarConversa = () => {
    setMensagens([]);
    setConversaFinalizada(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleEnviarMensagem();
    }
  };

  if (conversaFinalizada) {
    return (
      <div>
        <p>Conversa finalizada.</p>
        <Link to="/nova-conversa">Iniciar nova conversa</Link>
      </div>
    );
  }

  return (
    <div className="chat-container">
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
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleEnviarMensagem}>Enviar</button>
        <button onClick={handleFinalizarConversa}>Finalizar Conversa</button>
      </div>
    </div>
  );
};

export default Mensagens;
