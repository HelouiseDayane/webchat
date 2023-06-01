import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';

const Mensagens = () => {
  const { id } = useParams();
  const [mensagens, setMensagens] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [conversaFinalizada, setConversaFinalizada] = useState(false);
  const [resetChat, setResetChat] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/mensagems/${id}`)
      .then(response => {
        setMensagens(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  useEffect(() => {
    if (resetChat) {
      setMensagens([]);
      setNovaMensagem('');
      setConversaFinalizada(false);
      setResetChat(false);
    }
  }, [resetChat]);

  const handleEnviarMensagem = () => {
    if (novaMensagem.trim() !== '') {
      const mensagemEnviada = {
        id: Date.now(),
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

  const handleFinalizarConversa = () => {
    setMensagens([]);
    setConversaFinalizada(true);
  };

  const handleNovaConversa = () => {
    setResetChat(true);
    history.push('/nova-conversa');
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
        <button onClick={handleNovaConversa}>Iniciar nova conversa</button>
      </div>
    );
  }

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
