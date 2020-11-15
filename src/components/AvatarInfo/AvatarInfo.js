import './avatarinfo.css';

export default function AvatarInfo({actualUserOnline, totalUserPosts, totalUserComments, totalUserLikes}) {
  return (
    <div className="areaAvatar">
          
      <div className="userAvatar">
        <img src={`${process.env.PUBLIC_URL}/img/${actualUserOnline}.png`} alt="" />
      </div>
      <div className="userStats">
        <p>
          <b>{actualUserOnline}</b>
        </p>
        <p>
          <b>{totalUserPosts}</b> posts
        </p>
        <p>
          <b>{totalUserLikes}</b> curtidas
        </p>
        <p>
          <b>{totalUserComments}</b> comentários
        </p>
      </div>
    </div>
  )
}
