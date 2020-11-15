import './postheader.css';

export default function PostHeader({postHeaderData}) {
  return (
    <div className="postUserData">
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
    </div>
  )
}
