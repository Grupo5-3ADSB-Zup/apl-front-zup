import React from 'react';


const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-[#D7EAF0]'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-full shadow-xl bg-[#013440] flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <h2 className='text-[#F2CB05] text-2xl font-bold text-center py-8'>Notícias precisas</h2>
              <div className='text-center font-medium'>
                  <p className='text-[White] py-0 border-b mx-0'>Utilizando uma tecnologia para cruzamento de dados, entregaremos informações de diversas fontes, reunidas em um só lugar com a maior assertividade do mercado!
                  </p>
              </div>
              
          </div>
          <div className='w-full shadow-xl bg-[#013440] flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <h2 className='text-[#F2CB05] text-2xl font-bold text-center py-8'>Influenciadores</h2>
              <div className='text-center font-medium'>
                  <p className='text-[White] py-2 border-b mx-8'>Pela plataforma, você estará em contato com o ponto de vista de diversos influenciadores e especialistas do ramo</p>
              </div>
              
          </div>
          <div className='w-full shadow-xl bg-[#013440] flex flex-col p-4 md:my-0 my-8 rounded-lg hover:scale-105 duration-300'>
              <h2 className='text-[#F2CB05] text-2xl font-bold text-center py-8'>Inteligência artificial</h2>
              <div className='text-center font-medium'>
                  <p className='text-[White] py-2 border-b mx-8'>Para auxiliar ainda mais em suas tomadas de decisão, você também pode consultar diretamente a nossa inteligência artificial
                  </p>
              </div>
              
          </div>
      </div>
    </div>
  );
};

export default Cards;
