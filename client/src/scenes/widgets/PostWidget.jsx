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
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import MyPostWidget from "./MyPostWidget";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComponenteX from "./ComponenteX";
import { useEffect } from "react";
import { setPost } from "state";
import axios from "axios";

const PostWidget = ({
  noticiaId,
  userId,
  name,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user.id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [postagens, setPostagens] = useState([]);

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
        setResposta(JSON.stringify(response.data));
        console.log(JSON.stringify(response.data));
        console.log('Tudo certo!');
        alert('Evento cadastrado com sucesso!');
        axios.get(`/endpoint para get/${response.data.id}`)
          .then((resposta) => {
            setResposta(resposta.data);
          })
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
    } catch (error) {
      console.log('Erro ao obter as postagens:', error);
    }
  };

  // const patchLike = async (like) => {
  //   try {
  //     const response = await axios.put(`http://localhost:8080/noticia/likes/${}`, like);
  //     if (response.status === 200) {
  //       return response.data;
  //     } else {
  //       throw new Error("Ocorreu um erro ao atualizar a notícia.");
  //     }
  //   } catch (error) {
  //     console.error("Ocorreu um erro durante a solicitação:", error.message);
  //     throw error;
  //   }
  // };
  

  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {
        postagens.map(item => (
          <WidgetWrapper key={item.id} m="2rem 0">
            <Friend
              name={item.emissora}
              userPicturePath={userPicturePath}
            />
            <Typography fontSize={"18px"} marginBottom={"10px"} color={main} sx={{ mt: "1rem" }}>
              {item.titulo}
            </Typography>
            <Divider />
            <ComponenteX texto={item.descricao} idNoticia={item.id}  />
            <Box id={`noticia_${item.id}`}></Box>
            <Divider />
            <FlexBetween mt="0.25rem">
              <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                  {/* <IconButton onClick={patchLike}>
                    {isLiked ? (
                      <FavoriteOutlined sx={{ color: primary }} />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </IconButton> */}
                  <Typography>{likeCount}</Typography>
                </FlexBetween>

                <FlexBetween gap="0.3rem">
                  <IconButton onClick={() => setIsComments(!isComments)}>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography>{comments.length}</Typography>
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
                    <Input
                      placeholder="Digite uma pergunta"
                      values={resposta}
                      fullWidth
                      multiline
                      rows={10}
                      sx={{ marginBottom: '10px' }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button onClick={handleModalSubmit}  type="submit" variant="contained" sx={{ marginLeft: '10px' }}>
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
            {isComments && (
              <Box mt="0.5rem">
                {comments.map((comment, i) => (
                  <Box key={`${name}-${i}`}>
                    <MyPostWidget picturePath={picturePath} />
                    <Divider />
                    <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                      {comment}
                    </Typography>
                  </Box>
                ))}
                <Divider />
              </Box>
            )}
          </WidgetWrapper>
        ))}



        {
          resposta && <div resposta={resposta}> </div>
        }
    </>
  );
};

export default PostWidget;
