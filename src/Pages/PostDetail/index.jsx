import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getComments, getPostDetail } from "../../API/posts";
import { useContext } from "react";
import { AuthContext } from "../../Context/Auth";
import { CreateComment } from "../../Components/createComment";

function PostDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    getPostDetail(id).then((res) => {
      setDetail(res);
    });
    getComments(id).then((res) => {
      setComments(res);
    });
  }, [id]);

  return (
    <>
      <h1>Post ID: {id}</h1>
      {detail && (
        <div>
          <h2>{detail.title}</h2>
          <p>{detail.body}</p>
        </div>
      )}
      <h3>Comments:</h3>
      {comments.map((c) => (
        <div key={c.id}>
          <p>
            <strong>{c.user.email}</strong>
          </p>
          <p>{c.comment}</p>
        </div>
      ))}
      {isLoggedIn && <CreateComment id={id} />}
    </>
  );
}
export default PostDetail;
