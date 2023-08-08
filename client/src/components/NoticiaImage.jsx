import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const NoticiaImage = ({ size = "60px" }) => {
  const [noticiaImage, setNoticiaImage] = useState("");

  useEffect(() => {
    const fetchNoticiaImage = async () => {
      try {
        const response = await axios.get("https://apl-back-end-zup.azurewebsites.net/noticia/rss/gazeta", {
          responseType: "arraybuffer",
        });

        const arrayBuffer = response.data;
        const base64 = btoa(
          new Uint8Array(arrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), "")
        );
        const imageUrl = `data:image/jpeg;base64,${base64}`;

        setNoticiaImage(imageUrl);
      } catch (error) {
        console.log('Erro ao obter a foto do usuário:', error);
      }
    };

    fetchNoticiaImage();
  }, []);

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={noticiaImage}
      />
    </Box>
  );
};

export default NoticiaImage;
