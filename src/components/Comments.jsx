import { useEffect, useState } from "react";

import { getCommentsByArticleId } from "../utils/apiRequests";

import "./styles/comments.css";

const Comments = ({ article_id }) => {
  const [commentsToArticle, setCommentsToArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <button className="hide button">Hide Comments</button>
      <ul>
        {commentsToArticle.map((comment) => {
          return (
            <li key={comment.comment_id} className="comment">
              <p className="section-comments-body"> {comment.body} </p>
              <div className="section-comments-votes">
                <span>{comment.votes}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Comments;
