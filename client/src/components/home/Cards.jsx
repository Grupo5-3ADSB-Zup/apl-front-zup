import React from 'react';


const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <h2 className='text-[Black] text-2xl font-bold text-center py-8'>Noticias precisas</h2>
              <div className='text-center font-medium'>
                  <p className='text-[Black] py-2 border-b mx-8'>Utilizando uma tecnologia para cruzamento de dados, entregaremos informações de diversas fontes, reunidas em um só lugar com a maior assertividade do mercado!
                  </p>
              </div>
              
          </div>
          <div className='w-full shadow-xl bg-gray-100 flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <h2 className='text-[Black] text-2xl font-bold text-center py-8'>Influênciadores</h2>
              <div className='text-center font-medium'>
                  <p className='text-[Black] py-2 border-b mx-8'>Pela plataforma, você estará em contato com o ponto de vista de diversos influenciadores e especialistas do ramo</p>
              </div>
              
          </div>
          <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
              <h2 className='text-[Black] text-2xl font-bold text-center py-8'>Interação entre usuários</h2>
              <div className='text-center font-medium'>
                  <p className='text-[Black] py-2 border-b mx-8'>E como tudo que é compartilhado fica melhor, você também poderá iniciar conversas via chat entre outros investidores para desenvolver as ideias!
                  </p>
              </div>
              
          </div>
      </div>
    </div>
  );
};

export default Cards;
