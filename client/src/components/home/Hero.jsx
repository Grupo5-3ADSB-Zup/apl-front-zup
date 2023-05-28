import React from 'react';
import Typed from 'react-typed';

const Hero = () => {
  return (

    
    <div className='text-white'>
      <div className='max-w-[1150px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[white] font-bold p-2'>
         
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
           Inicie no mercado financeiro com facilidade
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-4xl sm:text-3xl text-xl font-bold py-4'>
            Aprenda com 
          </p>
          <Typed
          className='md:text-4xl sm:text-3xl text-xl font-bold md:pl-4 pl-2'
            strings={['diversos especialistas', 'diversas empresas', 'diversos influenciadores']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Tenha acesso às notícias mais atuais de forma sucinta e centralizada!</p>
        <button className='bg-[#F2CB05] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Sobre nós</button>
      </div>
    </div>
  );
};

export default Hero;
