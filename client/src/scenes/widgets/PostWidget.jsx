import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box, Divider, IconButton, Typography, useTheme, Button, Input,
  Modal,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import MyPostWidget from "./MyPostWidget";
import { useState } from "react";
import { useSelector } from "react-redux";
import ComponenteX from "./ComponenteX";
import { useEffect } from "react";
import axios from "axios";


const PostWidget = ({
  comentarioData,
  likes,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const loggedInUserId = useSelector((state) => state.user.id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [postagens, setPostagens] = useState([]);
  const [noticiaId, setNoiticiaId] = useState([]);
  const [comentario, setComentario] = useState('');
  const [comentarios, setComentarios] = useState([]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTitulo('');
    setPergunta('');
  };

  const handleQuestionChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setPergunta(event.target.value);
  };

  const handleModalSubmit = async (event) => {
    event.preventDefault();

    const data = {
      titulo,
      pergunta,
      resposta
    };

    axios
      .post('http://localhost:8080/noticia/rss/info', data)
      .then(response => {
        setResposta(response.data.resposta)
        console.log(response.data.resposta)
        console.log('Tudo certo!');
        alert('Evento cadastrado com sucesso!')

      })
      .catch(() => {
        console.log(data);
        console.log('Alguma coisa deu errado!');
      });
  };

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const getPost = async () => {


    try {
      const response = await axios.get("http://localhost:8080/admin/filaPilha/noticias");
      setPostagens(response.data);
      setNoiticiaId(response.data)
    } catch (error) {
      console.log('Erro ao obter as postagens:', error);
    }
  };

  const {
    id
  } = noticiaId

  const patchLike = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/noticia/likes/${id}`, likes);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Ocorreu um erro ao atualizar a notícia.");
      }
    } catch (error) {
      console.error("Ocorreu um erro durante a solicitação:", error.message);
      throw error;
    }
  };


  useEffect(() => {
    getPost();
  }, []);



  return (
    <>
      {
        postagens.map(item => (
          <WidgetWrapper key={item.id} m="2rem 0">

            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {item.emissora}
            </Typography>

            <Typography fontSize={"18px"} marginBottom={"10px"} color={main} sx={{ mt: "1rem" }}>
              {item.titulo}
            </Typography>
            <Divider />
            <ComponenteX texto={item.descricao} idNoticia={item.id} />
            <Box id={`noticia_${item.id}`}></Box>
            <Divider />
            <FlexBetween mt="0.25rem">
              <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                  <IconButton onClick={patchLike}>
                    {isLiked ? (
                      <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </IconButton>
                  <Typography>{likeCount}</Typography>
                </FlexBetween>

                <FlexBetween gap="0.3rem">
                  <IconButton onClick={() => setComentario(!comentario)}>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography>{comentario.length}</Typography>
                </FlexBetween>
              </FlexBetween>
              <IconButton onClick={handleModalOpen}>
                <ShareOutlined />
              </IconButton>
              <Modal open={isModalOpen} onClose={handleModalClose}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    width: '400px',
                    maxWidth: '95%',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                  }}
                >
                  <Typography variant="h5" gutterBottom>
                    Compartilhar Publicação
                  </Typography>
                  <form onSubmit={handleModalSubmit}>
                    <Input
                      placeholder="Digite um titulo"
                      values={titulo}
                      onChange={handleQuestionChange}
                      fullWidth
                      sx={{ marginBottom: '10px' }}
                    />
                    <Input
                      placeholder="Digite uma pergunta"
                      values={pergunta}
                      onChange={handleAnswerChange}
                      fullWidth
                      multiline
                      rows={4}
                      sx={{ marginBottom: '10px' }}
                    />
                    {resposta && (
                      <Typography variant="body1" sx={{ marginTop: '10px' }}>
                        {resposta}
                      </Typography>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button onClick={handleModalSubmit} type="submit" variant="contained" sx={{ marginLeft: '10px' }}>
                        Enviar
                      </Button>
                      <Button onClick={handleModalClose} variant="contained" sx={{ marginLeft: '10px' }}>
                        Cancelar
                      </Button>
                    </Box>
                  </form>
                </Box>
              </Modal>
            </FlexBetween>
            {comentario &&
            <Box mt="0.5rem">
              <Divider />
              <MyPostWidget idNoticia={item.id} comentarios={comentarios} setComentarios={setComentarios} />
              <Box key={item.id}>
                <Divider />
                {comentarios.map((comentario, index) => (
                  <div key={index} style={{ paddingLeft: '1rem' }}>
                    <Typography sx={{ color: main, m: '0.5rem 0' }}>
                      {comentario}
                    </Typography>
                    {index !== comentarios.length - 1 && <hr />}
                  </div>
                ))}
              </Box>
              <Divider />
            </Box>
            }
          </WidgetWrapper>
        ))}
    </>
  );
};

export default PostWidget;
