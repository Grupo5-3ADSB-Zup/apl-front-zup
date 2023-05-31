import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: email,
      to_name: 'Destinatário', // Defina o nome do destinatário do email
      message: message,
    };

    emailjs
      .send('service_ctdiwv1', 'template_xgmf0mm', templateParams, '0EquAZf6HfzVYru62')
      .then((result) => {
        console.log(result.text);
        alert('Email enviado com sucesso');
      })
      .catch((error) => {
        console.error(error.text);
        alert('Erro ao enviar o email');
      });

    setEmail('');
    setMessage('');
  };

  return (
    <div className='w-full py-16 text-white px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Alguma dúvida, reclamação ou sugestão?
          </h1>
          <p className='text-2xl'>Nos envie um e-mail pelo campo ao lado!</p>
        </div>
        <div className='my-4'>
          <form onSubmit={sendEmail}>
            <div className='flex flex-col items-center justify-center w-full'>
              <input
                className='p-3 flex w-full rounded-md text-black mb-4'
                type='email'
                placeholder='Digite seu e-mail...'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                className='p-3 flex w-full rounded-md text-black'
                placeholder='Digite sua mensagem...'
                name='message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button
                type='submit'
                className='bg-[#D7EAF0] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
