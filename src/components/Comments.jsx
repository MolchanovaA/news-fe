import { useEffect, useState } from "react";

import { getCommentsByArticleId } from "../utils/apiRequests";

import Collapsible from "./Collapsible";
import Form from "./Form";

import "./styles/comments.css";
import Comment from "./Comment";

const Comments = ({ article_id }) => {
  const [userName, setUserName] = useState("tickle122");
  const [commentsToArticle, setCommentsToArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [deletedId, setDeletedId] = useState([""]);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((data) => {
      setCommentsToArticle(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <section>..Comments are Loading..</section>;
  }

  return (
    <section className="section-comments">
      <h2>Comments</h2>
      <button className="hide button" id="hide">
        Hide Comments
      </button>

      <Collapsible>
        <button className="add-comment button" id="createComment">
          Add Comment
        </button>
        <Form
          article_id={article_id}
          userName={userName}
          setCommentsToArticle={setCommentsToArticle}
        />
      </Collapsible>
      <ul className="comments-list">
        {commentsToArticle.map((comment, i) => {
          if (!deletedId.includes(comment.comment_id)) {
            return (
              <Comment
                key={i}
                comment={comment}
                userName={userName}
                setDeletedId={setDeletedId}
              />
            );
          }
        })}
      </ul>
    </section>
  );
};

export default Comments;
