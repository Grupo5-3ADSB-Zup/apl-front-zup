import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";


const MyPostWidget = ({ idNoticia, comentarios, setComentarios }) => {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const { palette } = useTheme();
  const { id } = useSelector((state) => state.user);
  const [comentario, setComentario] = useState('');
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;


  const handlePost = async () => {
    const data = {
      comentario,
    };

    try {
      const response = await axios.post(`http://44.219.155.152:8080/noticia/comentarios/${id}/${idNoticia}`, data);
      const novoComentario = response.data.comentario;
      setComentarios([...comentarios, novoComentario]);
      setComentario('');
      console.log(novoComentario);
      alert('Comentário cadastrado com sucesso!');
    } catch (error) {
      console.log('Alguma coisa deu errado!', error);
    }
  };




  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage />
        <InputBase
          placeholder="Comente aqui..."
          onChange={(e) => setComentario(e.target.value)}
          value={comentario}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <FlexBetween style={{ justifyContent: 'flex-end' }}>
        <Button
          disabled={!comentario}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            marginTop: "10px"
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
