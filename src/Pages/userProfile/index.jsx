import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/Auth";
import { PostContext } from "../../Context/Post";
import { Link } from "react-router-dom";
import { Post } from "../../Components/Post";
import { userComments as _userComments } from "../../API/user";

export function UserProfile() {
  const { userPosts, setUserPosts, handleLike } = useContext(PostContext);
  const [pageData, setPageData] = useState(<></>);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    _userComments().then((res) => setUserComments(res));
  }, []);

  const renderUserComments = () => {
    return (
      <>
        {userComments.length &&
          userComments.map((c) => (
            <div key={c.id}>
              <p>
                <strong>{c.user.email}</strong>
              </p>
              <p>{c.comment}</p>
            </div>
          ))}
      </>
    );
  };

  const renderUserPosts = () => {
    console.log("onclick is working", userPosts);
    return (
      <>
        <div className="post-list">
          {userPosts.length &&
            userPosts.map((n) => {
              return (
                <Link
                  key={n.id}
                  to={`/post/${n.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Post
                    post={n}
                    handleLike={(e, id) =>
                      handleLike(e, id, userPosts, setUserPosts)
                    }
                  />
                </Link>
              );
            })}
        </div>
      </>
    );
  };

  return (
    <>
      <div>
        <button onClick={() => setPageData(renderUserPosts())}>posts</button>
        <button onClick={() => setPageData(renderUserComments)}>
          comments
        </button>
      </div>
      <div>{pageData}</div>
    </>
  );
}
export default UserProfile;
