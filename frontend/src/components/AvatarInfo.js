import styled from 'styled-components';

const StyledAreaAvatar = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${({theme}) => theme.border_color};
  padding: 10px;
  border-radius: 10px;
  box-shadow: 4px 4px 7px 0px rgb(0 0 0 / 12%);
  background-color: ${({theme}) => theme.tile_bg_color};
  & > .userAvatar {
    margin-right: 10px;
  }
  & > .userAvatar img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    background-color: ${({theme}) => theme.color_bg_image};
    box-shadow: 4px 4px 7px 0px rgb(0 0 0 / 12%);
  }
  & > .userStats p{
    line-height: 10px;
    text-align: left;
    color: ${({theme}) => theme.text_color}
  }
  @media (max-width: 720px) {
    .areaAvatar {
      justify-content: center;
    }
  }
`;

export default function AvatarInfo({actualUserOnline, totalUserPosts, totalUserComments, totalUserLikes}) {
  return (
    <StyledAreaAvatar>
      <div className="userAvatar">
        <img src={`${process.env.PUBLIC_URL}/img/${actualUserOnline}.png`} alt="" />
      </div>
      <div className="userStats">
        <p><b>{actualUserOnline}</b></p>
        <p><b>{totalUserPosts}</b> posts</p>
        <p><b>{totalUserLikes}</b> curtidas</p>
        <p><b>{totalUserComments}</b> comentários</p>
      </div>
    </StyledAreaAvatar>
  )
}
