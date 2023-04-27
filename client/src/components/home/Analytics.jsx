import React from 'react';

const Analytics = () => {
  return (
    <div className='w-full bg-white py-16 px-4 '>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src= "../../../public/assets/laptop.jpg" alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#F2CB05] font-bold '>Plataforma feita por investidores para investidores</p>
          <h1 className='text-[black] md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Sua centreal de conhecimentos sobre investimentos</h1>
          <p className='text-[black]'>
            Fique por dentro das notícias dos principais portais e entre de cabeça no mundo das finanças.
            E o melhor, tudo isso em um só lugar!
          </p>
          <button className='bg-[#D7EAF0] text-[#000812] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 ' >   Cadastre-se</button>
          
        </div>
      </div>
    </div>
  );
};

export default Analytics;
