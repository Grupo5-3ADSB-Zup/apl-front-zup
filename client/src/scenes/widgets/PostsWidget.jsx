import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);


  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };




  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>


      {posts.map(
        ({
          _id,
          likes,
          comments,
        }) => (
          <PostWidget

            key={_id}
            postId={_id}
            likes={likes}
            comments={comments}
          />
        )
      )}





      {/* {
        postagens.map(item => (


          <WidgetWrapper key={item.id} id={`noticia_${item.id}`}  m="2rem 0">

            <Typography color={main} sx={{ mt: "1rem" }}>
              {item.emissora}
            </Typography>
            <Typography color={main} sx={{ mt: "1rem" }}>
              {item.titulo}
            </Typography >

              <ComponenteX texto={item.descricao} idNoticia={item.id} />
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
        ))
      }  */}
    </>
  );
};

export default PostsWidget;
