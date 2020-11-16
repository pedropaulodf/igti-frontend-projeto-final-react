import './postcomment.css';

export default function PostComment({commentInfo, handleInputDeleteComment}) {

  function handleClickDeleteComment(commentId) {
    handleInputDeleteComment(commentId);
  }

  return (
    <div>
      <div className="comment">
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
      </div>
      
      <button className="deleteCommentBtn" onClick={() => handleClickDeleteComment(commentInfo.id)}>X</button>

    </div>
  )
}
