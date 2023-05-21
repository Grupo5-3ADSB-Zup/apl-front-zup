import React, { useState } from 'react';

function AppModal() {
  const [showModal, setShowModal] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode realizar qualquer ação desejada com a resposta, como enviá-la para o servidor, etc.
    console.log(answer);
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={handleModalToggle}>Abrir Modal</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Título do Modal</h2>
            <p>Pergunta do Modal</p>

            <form onSubmit={handleSubmit}>
              <input type="text" value={answer} onChange={handleAnswerChange} />
              <button type="submit">Enviar</button>
            </form>
          </div>
        </div>
      )}

      {/* Estilização do modal (exemplo básico) */}
      <style>
        {`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-content {
          background-color: #fff;
          padding: 20px;
        }
      `}
      </style>
    </div>
  );
}

export default AppModal;
