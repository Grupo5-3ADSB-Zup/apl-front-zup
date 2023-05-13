import React from 'react';

const Newsletter = () => {
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
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              className='p-3 flex w-full rounded-md text-black'
              type='email'
              placeholder='Digite aqui...'
            />
            <button className='bg-[#D7EAF0] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'>
              Enviar
            </button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
