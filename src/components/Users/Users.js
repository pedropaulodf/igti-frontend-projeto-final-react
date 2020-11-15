import './users.css';

export default function Users({onUserChange, allUserAvailable, activeUser}) {

  function handleUserChengeClick(user) {
    if (user !== activeUser) {
      onUserChange(user);
    }
  }

  return (
    <div className="areaCurrentUser">
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
    </div>
  )
}
