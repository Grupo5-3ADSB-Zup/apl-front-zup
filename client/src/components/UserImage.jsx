import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UserImage = ({ size = "60px" }) => {
  const [userImage, setUserImage] = useState("");
  const id = useSelector((state) => state.user.id);

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await axios.get(`http://44.219.155.152:8080/usuario/foto/${id}`, {
          responseType: "arraybuffer", 
        });

        const arrayBuffer = response.data;
        const bytes = new Uint8Array(arrayBuffer);

        let binary = "";
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }

        const base64 = btoa(binary);
        const imageUrl = `data:image/jpeg;base64,${base64}`;

        setUserImage(imageUrl);
      } catch (error) {
        console.log('Erro ao obter a foto do usuário:', error);
      }
    };

    fetchUserImage();
  }, [id]);

  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={userImage}
      />
    </Box>
  );
};

export default UserImage;
