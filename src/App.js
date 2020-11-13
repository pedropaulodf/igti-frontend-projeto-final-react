import "./app.css";

import antMan from './img/antman.png';

function App() {
  return (
    <div>
      <div className="container">
        <h1>Movinstagram</h1>
        <div className="topBar">
          <div className="areaAvatar">
            <div className="userAvatar">
              <img src={antMan} alt="" />
            </div>
            <div className="userStats">
              <p>
                <b>superman</b>
              </p>
              <p>
                <b>71</b> posts
              </p>
              <p>
                <b>383</b> curtidas
              </p>
              <p>
                <b>381</b> comentários
              </p>
            </div>
          </div>

          <div className="areaCurrentUser">
            <h3>Visualizar timeline com:</h3>

            <div className="currentUsers">
              <div className="user">
                <img src={antMan} alt="" />
                <p>batman</p>
              </div>

              <div className="user currentUser">
                <img src={antMan} alt="" />
                <p>superman</p>
              </div>

              <div className="user">
                <img src={antMan} alt="" />
                <p>wonderWoman</p>
              </div>
            </div>
          </div>
        </div>

        <div className="post">
          <div className="postImg">
            <img
              src="https://image.tmdb.org/t/p/w500/A5TK9Q63r2h4cx1q2Isl3bTaVlY.jpg"
              alt=""
            />
          </div>

          <div className="postInfo">
            <div className="postUserData">
              <div className="postUserAvatar">
                <img src={antMan} alt="" />
              </div>
              <div className="postUserName">
                <p>
                  <b>superman</b>
                </p>
              </div>
              <div className="postUserComment">
                <p>Gosto muito desse filme: "Aquaman".</p>
              </div>
            </div>

            <div className="likesCounter">
              <div className="likes">🖤 5</div>
              <div className="comments">💬 3</div>
            </div>

            <div className="areaComments">
              <div className="comment">
                <div className="friendAvatar">
                  <img src={antMan} alt="" />
                </div>
                <div className="friendName">
                  <p>aquaman</p>
                </div>
                <div className="friendComment">
                  <p>
                    Vou parar de te seguir se continuar postando filmes assim...
                  </p>
                </div>
              </div>

              <div className="comment">
                <div className="friendAvatar">
                  <img src={antMan} alt="" />
                </div>
                <div className="friendName">
                  <p>spiderMan</p>
                </div>
                <div className="friendComment">
                  <p>Muito bom! Esse filme realmente é sensacional!</p>
                </div>
              </div>

              <div className="inputCommentArea">
                <div className="actualUserAvatar">
                  <img src={antMan} alt="" />
                </div>
                <div className="inputArea">
                  <input type="text" placeholder="Digite seu comentário..."/>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="post">
          <div className="postImg">
            <img
              src="https://image.tmdb.org/t/p/w500/A5TK9Q63r2h4cx1q2Isl3bTaVlY.jpg"
              alt=""
            />
          </div>

          <div className="postInfo">
            <div className="postUserData">
              <div className="postUserAvatar">
                <img src={antMan} alt="" />
              </div>
              <div className="postUserName">
                <p>
                  <b>superman</b>
                </p>
              </div>
              <div className="postUserComment">
                <p>Gosto muito desse filme: "Aquaman".</p>
              </div>
            </div>

            <div className="likesCounter">
              <div className="likes">🖤 5</div>
              <div className="comments">💬 3</div>
            </div>

            <div className="areaComments">
              <div className="comment">
                <div className="friendAvatar">
                  <img src={antMan} alt="" />
                </div>
                <div className="friendName">
                  <p>aquaman</p>
                </div>
                <div className="friendComment">
                  <p>
                    Vou parar de te seguir se continuar postando filmes assim...
                  </p>
                </div>
              </div>

              <div className="comment">
                <div className="friendAvatar">
                  <img src={antMan} alt="" />
                </div>
                <div className="friendName">
                  <p>spiderMan</p>
                </div>
                <div className="friendComment">
                  <p>Muito bom! Esse filme realmente é sensacional!</p>
                </div>
              </div>

              <div className="inputCommentArea">
                <div className="actualUserAvatar">
                  <img src={antMan} alt="" />
                </div>
                <div className="inputArea">
                  <input type="text" placeholder="Digite seu comentário..."/>
                </div>
              </div>

            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default App;
