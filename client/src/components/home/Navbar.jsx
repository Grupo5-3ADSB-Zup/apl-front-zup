import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1250px] mx-auto px-4 text-white'>
      <h1 className='text-3xl font-bold text-[#F2CB05]'>ZUP</h1>
      <ul className='hidden md:flex max-w-[1250] '>
        <li className='p-4 font-medium'onClick={() => navigate("/")}>Home</li>
        <li className='p-4 font-medium'onClick={() => navigate("/login")}>Sobre nós</li>
        <li className='p-4 font-medium'onClick={() => navigate("/")}>Contate-nos</li>
        <li className='p-4 font-medium'>|</li>
        <button className='bg-[#D7EAF0] w-[100px] rounded-md font-medium my-1 mx-auto py-3 text-black' onClick={() => navigate("/login")}>Acesso</button>
        
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#F2CB05] m-4'>ZUP</h1>
          <li className='p-4 border-b border-gray-600'>Home</li>
          <li className='p-4 border-b border-gray-600'>Sobre nós</li>
          <li className='p-4 border-b border-gray-600'>Login</li>
          <li className='p-4 border-b border-gray-600'>Cadastro</li>
      </ul>
    </div>
  );
};

export default Navbar;
