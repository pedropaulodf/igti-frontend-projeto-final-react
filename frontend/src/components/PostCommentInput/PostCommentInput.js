import { useEffect, useState } from 'react';
import './postcommentinput.css';

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
        handleInputAddComment(postId, actualActiveUser, commentInput);
        setCommentInput('');
      }
    }
  }

  useEffect(() => {
    handleInputValidation();
  }, [commentInput])

  return (
    <div className="inputCommentArea">
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
    </div>
  )
}
