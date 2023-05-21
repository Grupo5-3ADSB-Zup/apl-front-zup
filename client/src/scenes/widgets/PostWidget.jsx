import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import MyPostWidget from "./MyPostWidget";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComponenteX from "./ComponenteX";
import { useEffect } from "react";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const [postagens, setPostagens] = useState([]);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const getPost = async () => {
    const response = await fetch("http://localhost:8080/admin/filaPilha/noticias", {
      method: "GET",
    });
    const data = await response.json();
    setPostagens(data)
  };

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  



  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      {
        postagens.map(item => (
          <WidgetWrapper m="2rem 0">
            <Friend
              name={item.emissora}
              userPicturePath={userPicturePath}
            />
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

              <IconButton>
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
    </>
  );
};

export default PostWidget;
