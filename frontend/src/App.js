import { useEffect, useState } from "react";
import AvatarInfo from "./components/AvatarInfo";
import Header from "./components/Header";
import Post from "./components/Post";
import Users from "./components/Users";
import { Sun, Moon } from 'react-feather';
import { v4 as uuidv4 } from 'uuid';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import api from './services/api';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({bodyBgColor}) => (bodyBgColor ? '#f9f9f9' : '#232323')};
    transition: background-color 0.3s;
    padding: 10px;
  }

  /* Body Scroll Bar */
  body::-webkit-scrollbar {
    width: 18px;
    height: 0px;
  }

  /* All elements Scroll Bar */
  ::-webkit-scrollbar {
    width: 14px;
    height: 0px;
  }
  ::-webkit-scrollbar-track {
    background: ${({bodyBgColor}) => (bodyBgColor ? '#f1f1f1' : '#404040')};
    border-radius: 10px;
    border: 1px solid ${({bodyBgColor}) => (bodyBgColor ? '#f1f1f1' : '#404040')};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({bodyBgColor}) => (bodyBgColor ? '#dbdbdb' : '#6b6b6b')};
    border-radius: 10px;
    border: 2px solid ${({bodyBgColor}) => (bodyBgColor ? '#f1f1f1' : '#404040')};
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${({bodyBgColor}) => (bodyBgColor ? '#cacaca' : '#868686')};
  }
`;

const lightTheme = {
  bg_color: '#f1f1f1',
  container_color: '#ffffff',
  border_color: '#eeeeee',
  border_color_hover: '#929292',
  user_selected_color: '#ececec',
  user_selected_color_hover: '#ffffff',
  color_indigo: 'indigo',
  span_info_color: '#b8b8b8',
  span_info_error_color: '#ff7676',
  tile_bg_color: '#ffffff',
  text_color: '#333333',
  bg_color_theme_switcher: '#333333',
  icon_color_theme_switcher: '#ffffff',
};

const darkTheme = {
  bg_color: '#333333',
  container_color: '#000000',
  border_color: '#4a4a4a',
  border_color_hover: '#ececec',
  user_selected_color: '#ececec',
  user_selected_color_hover: '#222222',
  color_indigo: 'indigo',
  span_info_color: '#f7f7f7',
  span_info_error_color: '#ff7676',
  tile_bg_color: '#333333',
  text_color: '#ffffff',
  bg_theme_switcher: '#ffffff',
  icon_color_theme_switcher: '#333333',
};

const StyledButtonThemeSwitcher = styled.button`
  position: fixed;
  right: 0;
  top: 0;
  cursor: pointer;
  border: none;
  outline: none;
  padding: 5px 10px;
  margin-right: 10px;
  border-radius: 0px 0px 20px 20px;
  color: ${({theme}) => theme.icon_color_theme_switcher};
  background-color: ${({theme}) => theme.bg_color_theme_switcher};
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 40px;
  & .topBar {
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    grid-gap: 10px;
    
  }
  @media (max-width: 720px) {
    .topBar {
      display: grid;
      grid-template-columns: 1fr;
    }
  }
`;

function App() {
  
  const [theme, setTheme] = useState(lightTheme);
  const [bodyTheme, setBodyTheme] = useState(true);

  const [carregando, setCarregando] = useState(true);

  const [defaultUser, setDefaultUser] = useState('superman');
  const [actualUser, setActualUser] = useState('superman');
  const [allUsers, setAllUsers] = useState([]);
  const [allPostsDataFromActualUser, setAllPostsDataFromActualUser] = useState([]);

  const [allUserPostsComments, setAllUserPostsComments] = useState([]);
  const [allUserPostsLikes, setAllUserPostsLikes] = useState([]);

  function handleThemeChange() {
    setBodyTheme(!bodyTheme);
    setTheme(oldTheme => {
      if (oldTheme.bg_color === '#f1f1f1') {
        return darkTheme;
      }
      return lightTheme;
    });
  }

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
    setCarregando(false);
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

  function handleChangeActiveUser(user) {
    setActualUser(user);
  }

  // Handle add post comment
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

  // Handle delete post comment
  async function handleDeletePostComment(commentId){

    await api.delete(`/comments/${commentId}`)
    .then((_) => {
      getAllPostsDataFromActualUser();
    })
    .catch(error => {
      console.log(error);
    });

  }

  // Handle like in a post
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

  // Handle dislike in a post
  async function handleDislikePost(likeId){

    await api.delete(`/likes/${likeId}`)
    .then((_) => {
      getAllPostsDataFromActualUser();
    })
    .catch(error => {
      console.log(error);
    });

  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle bodyBgColor={bodyTheme} />

      <StyledContainer>
        <Header>Movinstagram</Header>

        <StyledButtonThemeSwitcher onClick={handleThemeChange}>
          {bodyTheme ? <Moon className="icon" size={20}/> : <Sun className="icon" size={20}/>}
        </StyledButtonThemeSwitcher>

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

        {carregando 
        ? (<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>) 
        : (allPostsDataFromActualUser.length === 0
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
          ) 
        }
        
      </StyledContainer>
    </ThemeProvider>
  );
}

export default App;