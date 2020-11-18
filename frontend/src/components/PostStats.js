import styled from 'styled-components';
import { Heart, MessageSquare } from 'react-feather';

const StyledLikesCounter = styled.div`
  
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 4px;
  margin-left: 4px;
  color: ${({theme}) => theme.text_color};

  & .comments {
    margin-left: 10px;
  }

  & .likes {
    cursor: pointer;
  }

  & .likes, 
  & .comments {
    width: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & .likes .icon, 
  & .comments .icon {
    color: ${({theme}) => theme.text_color};
  }
`;

export default function PostStats({handleDisliked, handleLike, activeUserLiked, allWhoComment, allWhoLiked, totalLikes, totalComments}) {

  function handleLikeClick(){
    if (!activeUserLiked) {
      handleLike();
    }else{
      handleDisliked();
    }
  }

  return (
    <StyledLikesCounter>
      <div className="likes" title={allWhoLiked}>
        {activeUserLiked 
        ? <Heart className="icon" fill="currentColor" size={20} onClick={handleLikeClick}/> 
        : <Heart className="icon" size={20} onClick={handleLikeClick}/>}
        
        {totalLikes}
      </div>
      <div className="comments" title={allWhoComment}>
        <MessageSquare className="icon" size={20} />
        {totalComments}
      </div>
    </StyledLikesCounter>
  )
}
