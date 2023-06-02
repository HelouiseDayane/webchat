import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const AreaAtendente = () => {
  const [conversas, setConversas] = useState([]);
  const [filteredConversas, setFilteredConversas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedConversa, setSelectedConversa] = useState(null);
  const [mensagensModal, setMensagensModal] = useState([]);
  const [resposta, setResposta] = useState('');

  useEffect(() => {
    fetchConversas();

    const interval = setInterval(() => {
      fetchConversas();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchConversas = () => {
    axios
      .get('http://localhost:8000/api/conversas')
      .then(response => {
        setConversas(response.data.data);
        setFilteredConversas(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSearch = event => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredConversas = conversas.filter(conversa =>
      conversa.titulo.toLowerCase().includes(searchTerm)
    );
    setFilteredConversas(filteredConversas);
  };

  const openModal = conversa => {
    setSelectedConversa(conversa);
    setModalIsOpen(true);

    axios
      .get(`http://localhost:8000/api/conversas/${conversa.id}/mensagens`)
      .then(response => {
        setMensagensModal(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const closeModal = () => {
    setSelectedConversa(null);
    setModalIsOpen(false);
  };

  const handleEnviarResposta = () => {
    if (resposta.trim() !== '') {
      const mensagemEnviada = {
        conteudo: resposta,
        id_conversa: selectedConversa.id,
      };

      axios
        .post('http://localhost:8000/api/mensagens', mensagemEnviada)
        .then(response => {
          setMensagensModal([...mensagensModal, response.data.mensagem]);
          setResposta('');
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleFinalizarAtendimento = () => {
    axios
      .put(`http://localhost:8000/api/conversas/${selectedConversa.id}`, {
        finalizada: true,
      })
      .then(response => {
        setFilteredConversas(filteredConversas.filter(conversa => conversa.id !== selectedConversa.id));
        closeModal();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="chat-container">
      <h2>Área do Atendente</h2>
      <input
        type="text"
        placeholder="Pesquisar por título"
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Título</th>
          </tr>
        </thead>
        <tbody>
          {filteredConversas.map(conversa => (
            <tr key={conversa.id}>
              <td>
                <button onClick={() => openModal(conversa)}>
                  {conversa.titulo}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {selectedConversa && (
          <div>
            <h3>{selectedConversa.titulo}</h3>
            <div className="mensagens-container">
              {mensagensModal.map(mensagem => (
                <div
                  key={mensagem.id}
                  className={`mensagem ${
                    mensagem.enviada ? 'enviada' : 'recebida'
                  }`}
                >
                  {mensagem.conteudo}
                </div>
              ))}
            </div>
            <div className="envio-mensagem">
              <input
                type="text"
                value={resposta}
                onChange={e => setResposta(e.target.value)}
                placeholder="Digite sua resposta"
              />
              <button onClick={handleEnviarResposta}>Enviar</button>
            </div>
            <div>
              <button onClick={handleFinalizarAtendimento}>
                Finalizar Atendimento
              </button>
              <button onClick={closeModal}>Fechar</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AreaAtendente;
