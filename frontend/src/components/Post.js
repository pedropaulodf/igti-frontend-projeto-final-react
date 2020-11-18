import PostComment from './PostComment';
import PostCommentInput from './PostCommentInput';
import PostHeader from './PostHeader';
import PostStats from './PostStats';
import styled from 'styled-components';

const StyledPost = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  border: 1px solid ${({theme}) => theme.border_color};
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  box-shadow: 4px 4px 7px 0px rgb(0 0 0 / 12%);
  background-color: ${({theme}) => theme.tile_bg_color};

  & .postImg img {
    width: 100%;
    height: auto;
    margin-right: 10px;
    border-radius: 4px;
  }

  & .postInfo {
    padding: 10px 0px 0px 10px;
  }

  & .postInfo .postUserData {
    color: ${({theme}) => theme.text_color};
  }
  
  & .postInfo .areaComments {
    height: 317px;
    padding-right: 4px;
    overflow-y: scroll;
    background: 
      linear-gradient(${({theme}) => theme.tile_bg_color} 33%, rgba(255,255,255, 0)),
      linear-gradient(rgba(255,255,255, 0), ${({theme}) => theme.tile_bg_color} 66%) 0 100%,
      radial-gradient(farthest-side at 50% 0, rgba(176,176,176, 0.5), rgba(0,0,0,0)),
      radial-gradient(farthest-side at 50% 100%, rgba(176,176,176, 0.5), rgba(0,0,0,0)) 0 100%;
    background-color: ${({theme}) => theme.tile_bg_color};
    background-repeat: no-repeat;
    background-attachment: local, local, scroll, scroll;
    background-size: 100% 45px, 100% 45px, 100% 15px, 100% 15px;
    color: ${({theme}) => theme.text_color};
  }
  @media (max-width: 720px) {

    display: grid;
    grid-template-columns: 1fr;
    
    .postInfo {
      padding: 0px;
    }

    .postInfo .areaComments {
      height: 500px;
    }
  }
`;

export default function Post({handleDislikedPost, handleLikedPost, handleAddComment, handleDeleteComment, postData, activeUser}) {

  function handleAddPostComment(postId, user, userComment){
    handleAddComment(postId, user, userComment);
  }

  function handleDeletePostComment(commentId){
    handleDeleteComment(commentId);
  }

  function handlePostLike(postId) {
    handleLikedPost(postId, activeUser);
  }

  function handlePostDisliked(postId) {
    let data = [];
    data = postData.filter(({post}) => {
      return post.id === postId;
    });
    data = data[0].likes.filter((like) => {
      return like.user === activeUser;
    })
    handleDislikedPost(data[0].id);
  }

  return (
    <div>
      {postData.map(({post, comments, likes}) => {

        // Set who liked and who comment in each post
        let whoLiked = likes.map(like => like.user );
        let whoComment = comments.map(comment => comment.user);
        whoLiked = whoLiked.join('\n');
        whoComment = whoComment.join('\n');

        return (
          <StyledPost key={post.id} >
            <div className="postImg">
              <img
                src={post.picture}
                alt="Filme poster"
              />
            </div>

            <div className="postInfo">

              <PostHeader postHeaderData={post} />
              <PostStats 
                totalLikes={likes.length} 
                totalComments={comments.length} 
                allWhoLiked={whoLiked}
                allWhoComment={whoComment}
                activeUserLiked={likes.some(like => like.user === activeUser)}
                handleLike={() => handlePostLike(post.id)}
                handleDisliked={() => handlePostDisliked(post.id)}
              />

              <div className="areaComments">
                
                {comments.map(comment => {
                  return (
                    <PostComment 
                      key={comment.id} 
                      commentInfo={comment}
                      handleInputDeleteComment={handleDeletePostComment}
                    />
                  );
                })}
                
              </div>
                <PostCommentInput 
                  postId={post.id} 
                  actualActiveUser={activeUser}
                  handleInputAddComment={handleAddPostComment}
                />
            </div>
          </StyledPost>
        );
      })}
      
    </div>
  )
}
