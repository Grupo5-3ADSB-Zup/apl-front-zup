import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#F2CB05]'>ZUP</h1>
        <p className='py-4'>Acesse as nossas redes abaixo para ficar por dentro de todos os nossos conteúdos</p>
        <div className='flex justify-between md:w-[75%] my-6'>
            <FaFacebookSquare size={30} />
            <FaInstagram size={30} />
            <FaTwitterSquare size={30} />
            <FaGithubSquare size={30} />
            <FaDribbbleSquare size={30} />
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-around mt-6'>

    <div>
        <h6 className='font-medium text-gray-400'>Informativos</h6>
        <ul>
            <li className='py-2 text-sm'>Home</li>
            <li className='py-2 text-sm'>Sobre nós</li>
            <li className='py-2 text-sm'>Contate-nos</li>
            <li className='py-2 text-sm'>Acesso</li>
        </ul>
    </div>
    <div>
        <h6 className='font-medium text-gray-400'>Redes de contato</h6>
        <ul>
            <li className='py-2 text-sm'>Linkedin</li>
            <li className='py-2 text-sm'>Instagram</li>
            <li className='py-2 text-sm'>Facebook</li>
            <li className='py-2 text-sm'>Twitter</li>
            <li className='py-2 text-sm'>Zup</li>
        </ul>
    </div>
    
      </div>
    </div>
  );
};

export default Footer;
