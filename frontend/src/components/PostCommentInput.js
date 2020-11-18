import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledInputCommentArea = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;

  & .actualUserAvatar {
    align-self: baseline;
  }

  & .actualUserAvatar img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 50px;
    background-color: ${({theme}) => theme.color_indigo};
    box-shadow: 4px 4px 7px 0px rgb(0 0 0 / 12%);
  }

  & .inputArea {
    width: 100%;
  }

  & .inputArea input,
  & .inputArea textarea {
    width: 100%;
    height: 50px;
    max-height: 120px;
    min-height: 50px;
    margin-right: 10px;
    border-radius: 10px;
    border: 1px solid ${({theme}) => theme.border_color};
    box-shadow: 4px 4px 7px 0px rgb(0 0 0 / 12%);
    box-sizing: border-box;
    padding: 10px 12px;
    font-size: 15px;
    resize: vertical;
    color: ${({theme}) => theme.text_color};
    background-color: ${({theme}) => theme.tile_bg_color};
  }

  & .inputArea input:hover,
  & .inputArea textarea:hover {
    border: 1px solid ${({theme}) => theme.border_color_hover};
  }

  & .inputArea .messageInfo {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: .8em;
    margin-left: 12px;
    color: ${({theme}) => theme.span_info_color};
    text-align: left;
  }

  & .inputArea .messageInfoError {
    color: ${({theme}) => theme.span_info_error_color};
  }
`;

export default function PostCommentInput({handleInputAddComment, postId, actualActiveUser}) {

  const [commentInput, setCommentInput] = useState('');
  const [infoMessage, setInfoMessage] = useState('Aperte enter para enviar');

  function handleInputValidation() {
    if (commentInput.length !== 0) {
      if (commentInput.length <= 5) {
        setInfoMessage('Digite mais que 5 caracteres');
        return false;
      }else{
        setInfoMessage('Aperte enter para enviar');
        return true;
      }
    }
  }
  
  function handleKeyPress(event){
    
    if(event.key === 'Enter'){
      if (handleInputValidation()) {
        event.preventDefault();
        handleInputAddComment(postId, actualActiveUser, commentInput);
        setCommentInput('');
      }
    }
  }

  useEffect(() => {
    handleInputValidation();
  }, [commentInput])

  return (
    <StyledInputCommentArea>
      <div className="actualUserAvatar">
        <img src={`${process.env.PUBLIC_URL}/img/${actualActiveUser}.png`} alt="" />
      </div>
      <div className="inputArea">
        <textarea 
          // type="text"
          rows="3" 
          placeholder="Digite seu comentário..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyPress={handleKeyPress}
        ></textarea>
        <span className="messageInfo">{infoMessage}</span>
      </div>
    </StyledInputCommentArea>
  )
}
