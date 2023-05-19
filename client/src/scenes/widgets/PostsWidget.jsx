import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import PostWidget from "./PostWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import WidgetWrapper from "components/WidgetWrapper";
import ComponenteX from "./ComponenteX";

const PostsWidget = ({ userId, isProfile = false }) => {
  const { _id, picturePath } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const [postagens, setPostagens] = useState([]);

  const getPosts = async () => {
    const response = await fetch("http://localhost:8080/noticia/rss", {
      method: "GET",
    });
    const data = await response.json();
    setPostagens(data)
    // dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data.reverse() }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>

      {
        postagens.map(item => (


          <WidgetWrapper key={item.id} id={`noticia_${item.id}`}  m="2rem 0">

            <Typography color={main} sx={{ mt: "1rem" }}>
              {item.emissora}
            </Typography>
            <Typography color={main} sx={{ mt: "1rem" }}>
              {item.titulo}
            </Typography >
              <ComponenteX width="100%"
            height="auto"
            alt="post"
            style={{borderRadius: "0.75rem", marginTop: "0.75"}}
              texto={item.descricao} idNoticia={item.id} />
        

            
            

          </WidgetWrapper>
        ))
      }
    </>
  );
};

export default PostsWidget;
