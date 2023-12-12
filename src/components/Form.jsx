import { useState, useEffect } from "react";
import { postComment } from "../utils/apiRequests";

const Form = ({ article_id, setAddComment }) => {
  const [userName, setUserName] = useState("tickle122");
  const [commentBody, setCommentBody] = useState("");

  const newCommentHandler = (e) => {
    e.preventDefault();
    const postBody = {
      username: userName,
      body: commentBody,
    };

    if (userName && commentBody) {
      postComment(article_id, postBody).then(({ data: { posted_comment } }) => {
        setAddComment(posted_comment);
        setCommentBody("");
      });
      alert("posting in progress");
    } else {
      alert("add comment");
    }
  };

  const commentBodyHandler = (e) => {
    setCommentBody(e.target.value);
  };

  return (
    <form method="POST" className="new-comment" onSubmit={newCommentHandler}>
      <label>
        {" "}
        {userName} Says:
        <textarea
          type="text"
          name="new-comment-body"
          placeholder="... add your comment ..."
          onChange={commentBodyHandler}
          value={commentBody}
        />
      </label>
      <button className="button">Add</button>
    </form>
  );
};
export default Form;
