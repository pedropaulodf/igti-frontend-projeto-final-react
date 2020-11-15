import { useEffect, useState } from 'react';
import { Heart, MessageSquare } from 'react-feather';
import './poststats.css';

export default function PostStats({handleDisliked, handleLike, activeUserLiked, commentsInfo, likesInfo, totalLikes, totalComments}) {

  const [whoLiked, setWhoLiked] = useState([]);
  const [whoCommented, setWhoCommented] = useState([]);

  useEffect(() => {
    let likes = likesInfo.map(like => {
      return like.user;
    })

    let comments = commentsInfo.map(comment => {
      return comment.user;
    })

    setWhoLiked(likes.join('\n'));
    setWhoCommented(comments.join('\n'));
  },[])

  function handleLikeClick(){
    if (!activeUserLiked) {
      handleLike();
    }else{
      handleDisliked();
    }
  }


  return (
    <div className="likesCounter">
      <div className="likes" title={whoLiked}>
        {activeUserLiked 
        ? <Heart color="#333333"  fill="true" size={20} onClick={handleLikeClick}/> 
        : <Heart color="#333333" size={20} onClick={handleLikeClick}/>}
        
        {totalLikes}
      </div>
      <div className="comments" title={whoCommented}>
        <MessageSquare color="#333333" size={20} />
        {totalComments}
      </div>
    </div>
  )
}
