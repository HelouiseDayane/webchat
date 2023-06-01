import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const Conversas = () => {
  const [conversas, setConversas] = useState([]);
  const [filteredConversas, setFilteredConversas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedConversa, setSelectedConversa] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/conversas')
      .then(response => {
        setConversas(response.data.data);
        setFilteredConversas(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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
  };

  const closeModal = () => {
    setSelectedConversa(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      <h2>Conversas</h2>
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
            {/* Exiba todas as conversas relacionadas a essa conversa */}
            {/* Implemente o código necessário para exibir as conversas */}
          </div>
        )}
        <button onClick={closeModal}>Fechar</button>
      </Modal>
    </div>
  );
};

export default Conversas;
