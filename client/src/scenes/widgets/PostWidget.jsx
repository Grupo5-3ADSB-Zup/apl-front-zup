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
  userId,
  name,
  picturePath,
  userPicturePath,
  likes,
  comments,
  size = "60px"
}) => {
  const [isComments, setIsComments] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');
  const loggedInUserId = useSelector((state) => state.user.id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [postagens, setPostagens] = useState([]);
  const [noticiaId, setNoiticiaId] = useState([]);


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
                  <IconButton onClick={() => setIsComments(!isComments)}>
                    <ChatBubbleOutlineOutlined />
                  </IconButton>
                  <Typography>{comments.length}</Typography>
                </FlexBetween>
              </FlexBetween>

              <IconButton onClick={handleModalOpen}>
                <ShareOutlined />
              </IconButton>

              
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
