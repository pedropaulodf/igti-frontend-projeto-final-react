import { useEffect, useState } from 'react';
import { Heart, MessageSquare } from 'react-feather';
import './poststats.css';

export default function PostStats({handleDisliked, handleLike, activeUserLiked, allWhoComment, allWhoLiked, totalLikes, totalComments}) {

  function handleLikeClick(){
    if (!activeUserLiked) {
      handleLike();
    }else{
      handleDisliked();
    }
  }


  return (
    <div className="likesCounter">
      <div className="likes" title={allWhoLiked}>
        {activeUserLiked 
        ? <Heart color="#333333"  fill="true" size={20} onClick={handleLikeClick}/> 
        : <Heart color="#333333" size={20} onClick={handleLikeClick}/>}
        
        {totalLikes}
      </div>
      <div className="comments" title={allWhoComment}>
        <MessageSquare color="#333333" size={20} />
        {totalComments}
      </div>
    </div>
  )
}
