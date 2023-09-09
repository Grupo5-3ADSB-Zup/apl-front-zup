import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  Api,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Button,
  Input,
  Modal,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import MyPostWidget from "./MyPostWidget";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ComponenteX from "./ComponenteX";
import axios from "axios";
import UserImage from "components/UserImage";
import state from "state";

const PostsWidget = ({ }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const loggedInUserId = useSelector((state) => state.user.id);
  const idUser = useSelector((state) => state.user.id);
  const nome = useSelector((state) => state.user.nome);
  const [postagens, setPostagens] = useState([]);
  const [comentarioId, setComentarioId] = useState([]);
  const [comentarios, setComentarios] = useState([]);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const dark = palette.neutral.dark;

  console.log((state) => state.user)

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTitulo("");
    setPergunta("");
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
      resposta,
    };

    try {
      const response = await axios.post(
        "http://44.219.155.152:8080/noticia/rss/info",
        data
      );
      setResposta(response.data.resposta);
      console.log(response.data.resposta);
      console.log("Tudo certo!");
      alert("Evento cadastrado com sucesso!");
    } catch (error) {
      console.log(data);
      console.log("Alguma coisa deu errado!");
    }
  };

  const getPost = async () => {
    try {
      const response = await axios.get(
        "http://44.219.155.152:8080/admin/filaPilha/noticias"
      );
      setPostagens(response.data);
    } catch (error) {
      console.log("Erro ao obter as postagens:", error);
    }
  };

  const patchLike = async (id) => {
    try {
      const response = await axios.post(
        `http://44.219.155.152:8080/noticia/likes/${idUser}/${id}`,
        {
          likes: 1
        }
        ,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        const updatedNoticia = response.data;
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

  const handleComentarioClick = (id) => {
    setComentarioId(id === comentarioId ? null : id);
  };

  const handleLike = (id) => {
    patchLike(id)
  }

  return (
    <>
      {postagens.map((item) => (
        <WidgetWrapper key={item.id} m="2rem 0">
          <Typography
            color={primary}
            variant="h3"
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
          <Typography fontSize={"13px"} marginBottom={"10px"} color={main} sx={{ mt: "1rem" }}>
          <ComponenteX texto={item.descricao} idNoticia={item?.id} />
          <Box id={`noticia_${item.id}`}></Box>
          </Typography>
          <Divider />
          <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
              <FlexBetween gap="0.3rem">
                <IconButton onClick={() => handleLike(item.id)}>
                  <FavoriteOutlined />
                </IconButton>
                <Typography>{item.likes ?? 0}</Typography>
              </FlexBetween>

              <FlexBetween gap="0.3rem">
                <IconButton onClick={() => handleComentarioClick(item.id)}>
                  <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>{comentarios.length}</Typography>
              </FlexBetween>
            </FlexBetween>
            <IconButton onClick={handleModalOpen}>
              <Api />
            </IconButton>
            <Modal open={isModalOpen} onClose={handleModalClose}>
              <WidgetWrapper
                display="flex"
                justifyContent="center"
                alignItems="center"
                position={"center"}
                sx={{
                  width: "50vh",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Pergunte à nossa IA
                  </Typography>
                  <form onSubmit={handleModalSubmit}>
                    <Input
                      placeholder="Digite um título"
                      value={titulo}
                      onChange={handleQuestionChange}
                      fullWidth
                      sx={{ marginBottom: "10px" }}
                    />
                    <Input
                      placeholder="Digite uma pergunta"
                      value={pergunta}
                      onChange={handleAnswerChange}
                      fullWidth
                      multiline
                      rows={4}
                      sx={{ marginBottom: "10px" }}
                    />
                    {resposta && (
                      <Typography variant="body1" sx={{ marginTop: "10px" }}>
                        {resposta}
                      </Typography>
                    )}
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button
                        onClick={handleModalSubmit}
                        type="submit"
                        variant="contained"
                        sx={{ marginLeft: "10px" }}
                      >
                        Enviar
                      </Button>
                      <Button
                        onClick={handleModalClose}
                        variant="contained"
                        sx={{ marginLeft: "10px" }}
                      >
                        Cancelar
                      </Button>
                    </Box>
                  </form>
                </Box>
              </WidgetWrapper>
            </Modal>
          </FlexBetween>
          {comentarioId === item.id && (
            <Box mt="0.5rem">
              <Divider />
              <MyPostWidget
                idNoticia={item.id}
                comentarios={comentarios}
                setComentarios={setComentarios}
              />
              <Box key={item.id}>
                <Divider />
                {item?.comentarios?.map((comentario, index) => {
                  // Check if the comment matches the ID of the news
                  return (
                    <div key={index} style={{ paddingLeft: "1rem" }}>
                      <Box marginTop={"10px"} display="flex" alignItems="center">
                        <UserImage size="30px" />
                        <Box ml={1}>
                          <Typography
                            variant="h5"
                            color={main}
                            fontWeight="200"
                            sx={{
                              "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                              },
                            }}
                          >
                            {nome}
                          </Typography>
                        </Box>
                      </Box>
                      {comentario && (
                        <Box mt={0.5}>
                          <Typography sx={{ color: main, m: "1.5rem 0" }}>
                            {comentario.descricao}
                          </Typography>
                          {index !== comentarios.length - 1 && <hr />}
                        </Box>
                      )}
                    </div>
                  );
                })}
              </Box>
              <Divider />
            </Box>
          )}
        </WidgetWrapper>
      ))}
    </>
  );
};

export default PostsWidget;
