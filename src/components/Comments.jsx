import { useEffect, useState } from "react";

import { getCommentsByArticleId } from "../utils/apiRequests";

import Collapsible from "./Collapsible";
import Form from "./Form";

import "./styles/comments.css";

const Comments = ({ article_id }) => {
  const [commentsToArticle, setCommentsToArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addComment, setAddComment] = useState("");

  useEffect(() => {
    getCommentsByArticleId(article_id).then((data) => {
      setCommentsToArticle(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setCommentsToArticle((currentComments) => {
      return [addComment, ...currentComments];
    });
  }, [addComment]);

  useEffect(() => {
    console.log("from 2nd use E", commentsToArticle);
  }, [commentsToArticle]);
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
        <Form article_id={article_id} setAddComment={setAddComment} />
      </Collapsible>
      <ul className="comments-list">
        {commentsToArticle.map((comment) => {
          return (
            <li key={comment.comment_id} className="comment">
              <div className="section-comments-author">{comment.author}</div>
              <p className="section-comments-body"> {comment.body}</p>

              <div className="section-comments-votes">
                Votes : <span>{comment.votes}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Comments;
