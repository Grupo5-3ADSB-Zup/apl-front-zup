import PostWidget from "./PostWidget";

function ComponenteX(props) {
  const { texto, idNoticia } = props;
  
 
  
  const updateDivNoticia = () => {
  const divNoticia = document.getElementById(`noticia_${idNoticia}`);
  if (divNoticia) {
  divNoticia.innerHTML = texto;
  }
  };

  <PostWidget noticiaId ={idNoticia} />
  
  updateDivNoticia();
  
  return null; 
  }
  
  export default ComponenteX;