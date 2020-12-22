import styled from 'styled-components';

const StyledPostUserData = styled.div`

  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({theme}) => theme.text_color};

  & .postUserAvatar img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 50px;
    background-color: ${({theme}) => theme.color_bg_image};
    box-shadow: 4px 4px 7px 0px rgb(0 0 0 / 12%);
  }

  & .postUserComment p {
    text-align: left;
    margin-left: 10px;
  }
`;

export default function PostHeader({postHeaderData}) {
  return (
    <StyledPostUserData>
      <div className="postUserAvatar">
        <img src={`${process.env.PUBLIC_URL}/img/${postHeaderData.user}.png`} alt="" />
      </div>
      <div className="postUserName">
        <p>
          <b>{postHeaderData.user}</b>
        </p>
      </div>
      <div className="postUserComment">
        <p>{postHeaderData.title}</p>
      </div>
    </StyledPostUserData>
  )
}
