import styled from 'styled-components';

const StyledAreaCurrentUser = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 4px 4px 7px 0px rgb(0 0 0 / 12%);
  border: 1px solid ${({theme}) => theme.border_color};
  background-color: ${({theme}) => theme.tile_bg_color};
  padding: 20px 0px;

  & h3{
    margin: 0;
    margin-bottom: 10px;
    color: ${({theme}) => theme.text_color};
  }

  & .currentUsers {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & .currentUsers .user {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 24px;
    cursor: pointer;
    margin: 3px 3px;
    border-radius: 40px;
    transition: box-shadow 0.2s ease-out;
    border: 1px solid ${({theme}) => theme.border_color};
    color: ${({theme}) => theme.text_color};
  }

  & .currentUsers .user:hover {
    background-color: ${({theme}) => theme.user_selected_color_hover};
    box-shadow: 4px 4px 7px 0px rgb(0 0 0 / 12%);
    border: 1px solid ${({theme}) => theme.border_color};
  }

  & .currentUsers .currentUser {
    box-shadow: 4px 4px 7px 0px rgb(0 0 0 / 12%);
  }

  & .currentUsers .user img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
    background-color: ${({theme}) => theme.color_indigo};
    box-shadow: 4px 4px 7px 0px rgb(0 0 0 / 12%);
    margin-right: 10px;
  }

  @media (max-width: 500px) {
    .currentUsers {
      flex-direction: column;
    }
  }
`;

export default function Users({onUserChange, allUserAvailable, activeUser}) {

  function handleUserChengeClick(user) {
    if (user !== activeUser) {
      onUserChange(user);
    }
  }

  return (
    <StyledAreaCurrentUser>
      
      <h3>Visualizar timeline com:</h3>

      <div className="currentUsers">

        {allUserAvailable.map(user => {
          return (
          <div key={user} className={user === activeUser ? 'user currentUser' : 'user'} onClick={() => handleUserChengeClick(user)}>
            <img src={`${process.env.PUBLIC_URL}/img/${user}.png`} alt="" />
            <p>{user}</p>
          </div>
          )
        })}
        
      </div>
    </StyledAreaCurrentUser>
  )
}
