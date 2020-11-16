import { useEffect, useState } from "react";
import AvatarInfo from "./components/AvatarInfo/AvatarInfo";
import Header from "./components/Header/Header";
import Post from "./components/Post/Post";
import Users from "./components/Users/Users";
import { v4 as uuidv4 } from 'uuid';

import api from './services/api';

import "./app.css";

function App() {
  
  const [defaultUser, setDefaultUser] = useState('superman');
  const [actualUser, setActualUser] = useState('superman');
  const [allUsers, setAllUsers] = useState([]);
  const [allPostsDataFromActualUser, setAllPostsDataFromActualUser] = useState([]);

  const [allUserPostsComments, setAllUserPostsComments] = useState([]);
  const [allUserPostsLikes, setAllUserPostsLikes] = useState([]);

  async function getAllPostsDataFromActualUser() {
    const allPostsUser = await api.get(`/posts?user=${defaultUser}`).then(response => {
      return response.data;
    });

    const allPostsComments = await api.get(`/comments`).then(response => {
      return response.data;
    });

    const allPostsLikes = await api.get(`/likes`).then(response => {
      return response.data;
    });

    // Create a new array with all post data
    let allPostsData = [];
    let allPostsTotalComments = 0;
    let allPostsTotalLikes = 0;

    allPostsUser.forEach(post => {
      let comments = allPostsComments.filter(comment => {
        return comment.postId === post.id;
      });

      let likes = allPostsLikes.filter(like => {
        return like.postId === post.id;
      });

      allPostsData.push({
          post, 
          comments, 
          likes,
          'totalComments': comments.length, 
          'totalLikes': likes.length,
        }
      );
    })

    // Get all comments for the actual user posts
    allPostsTotalComments = allPostsData.reduce((acc, curr) => {
      return acc += curr.totalComments;
    }, 0)

    // Get all likes for the actual user posts
    allPostsTotalLikes = allPostsData.reduce((acc, curr) => {
      return acc += curr.totalLikes;
    }, 0)

    setAllUserPostsComments(allPostsTotalComments);
    setAllUserPostsLikes(allPostsTotalLikes);
    setAllPostsDataFromActualUser(allPostsData);
  }

  useEffect(() => {
    const setAllUserAvailable = async () => {
      const bestFriends = await api.get(`/bestFriends`).then(response => {
        return response.data;
      });
      bestFriends.push(actualUser);
      setAllUsers(bestFriends);
    }

    setAllUserAvailable();
    getAllPostsDataFromActualUser();

  },[])

  // console.log(allPostsDataFromActualUser);

  function handleChangeActiveUser(user) {
    setActualUser(user);
  }

  async function handleAddPostComment(postId, user, comment){

    const userComment = {
      id: uuidv4(),
      comment,
      user,
      postId,
    }

    await api.post(`/comments`, userComment).then(response => {
      getAllPostsDataFromActualUser();
    })

  }

  async function handleLikePost(postId, user){

    const userLiked = {
      id: uuidv4(),
      postId,
      user
    }

    await api.post(`/likes`, userLiked).then(response => {
      getAllPostsDataFromActualUser();
    })

  }

  async function handleDislikePost(likeId){

    await api.delete(`/likes/${likeId}`)
    .then(resp => {
      console.log(resp.data)
    })
    .catch(error => {
      console.log(error);
    });
    getAllPostsDataFromActualUser();

  }

  async function handleDeletePostComment(commentId){

    await api.delete(`/comments/${commentId}`)
    .then(resp => {
      console.log(resp.data)
    })
    .catch(error => {
      console.log(error);
    });
    getAllPostsDataFromActualUser();

  }

  return (
    <div className="container">
      <Header>Movinstagram</Header>
      
        <div className="topBar">
          <AvatarInfo 
            actualUserOnline={defaultUser}
            totalUserPosts={allPostsDataFromActualUser.length}
            totalUserComments={allUserPostsComments}
            totalUserLikes={allUserPostsLikes}
          />
          <Users 
            allUserAvailable={allUsers} 
            activeUser={actualUser} 
            onUserChange={handleChangeActiveUser}
          />
        </div>

      {allPostsDataFromActualUser.length === 0
        ? (<p>Nenhum post encontrado...</p>) 
        : (
            <Post 
              postData={allPostsDataFromActualUser} 
              activeUser={actualUser} 
              handleAddComment={handleAddPostComment}
              handleDeleteComment={handleDeletePostComment}
              handleLikedPost={handleLikePost}
              handleDislikedPost={handleDislikePost}
            />
          )
      }
      
    </div>
  );
}

export default App;