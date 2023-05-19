function ComponenteX(props) {
  const { texto, idNoticia } = props;
  
  console.log(texto);
  console.log(idNoticia);
  
  const updateDivNoticia = () => {
  const divNoticia = document.getElementById(`noticia_${idNoticia}`);
  if (divNoticia) {
  divNoticia.innerHTML = texto;
  }
  };
  
  updateDivNoticia();
  
  return null; 
  }
  
  export default ComponenteX;