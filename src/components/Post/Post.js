import PostComment from '../PostComment/PostComment';
import PostCommentInput from '../PostCommentInput/PostCommentInput';
import PostHeader from '../PostHeader/PostHeader';
import PostStats from '../PostStats/PostStats';
import './post.css';

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
    // console.log(data[0].id);
    handleDislikedPost(data[0].id);
  }

  return (
    <div>
      {postData.map(({post, comments, likes}) => {
        return (
          <div key={post.id} className="post" >
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
                likesInfo={likes}
                commentsInfo={comments}
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
                <PostCommentInput 
                  postId={post.id} 
                  actualActiveUser={activeUser}
                  handleInputAddComment={handleAddPostComment}
                />
                
              </div>
            </div>
          </div>
        );
      })}
      
    </div>
  )
}
