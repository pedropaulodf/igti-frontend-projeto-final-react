import styled from 'styled-components';
import { X } from 'react-feather';

const StyledComment = styled.div`

  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-template-rows: auto auto;
  grid-template-areas: 
  "friendAvatar friendComment"
  "friendName friendComment";
  padding: 10px 0px;
  border: 1px solid ${({theme}) => theme.border_color};
  margin-top: 3px;
  border-radius: 6px;


  & .friendAvatar{
    grid-area: friendAvatar;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  & .friendAvatar img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    background-color: ${({theme}) => theme.color_bg_image};
    box-shadow: 4px 4px 7px 0px rgb(0 0 0 / 12%);
  }

  & .friendName {
    grid-area: friendName;
    min-width: 90px;
  }

  & .friendName p{
    margin: 0;
    text-align: center;
    font-weight: bold;
    
    word-wrap: break-word;
    font-size: 0.8em;
  }

  & .friendComment{
    grid-area: friendComment;
  }

  & .friendComment p {
    text-align: left;
    margin: 10px;
  }
`;

const StyledButton = styled.button`

  margin-top: -24px;
  margin-right: 1px;
  display: block;
  float: right;
  cursor: pointer;
  border: none;
  padding: 4px 0px 1px 8px;
  border-radius: 30px 0px 6px 0px;
  opacity: 0.2;
  display: flex;

  &:hover {
    opacity: .8;
  }
`;

export default function PostComment({commentInfo, handleInputDeleteComment}) {

  function handleClickDeleteComment(commentId) {
    handleInputDeleteComment(commentId);
  }

  return (
    <div>
      <StyledComment>
        <div className="friendAvatar">
          <img src={`${process.env.PUBLIC_URL}/img/${commentInfo.user}.png`} alt="" />
        </div>
        <div className="friendName">
          <p>{commentInfo.user}</p>
        </div>
        <div className="friendComment">
          <p>
          {commentInfo.comment}
          </p>
        </div>
      </StyledComment>
      
      <StyledButton className="deleteCommentBtn" onClick={() => handleClickDeleteComment(commentInfo.id)} title="Exclur esse comentário">
        <X size={18} />
      </StyledButton>

    </div>
  )
}
