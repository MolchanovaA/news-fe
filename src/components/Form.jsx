import { useState, useEffect } from "react";
import { postComment } from "../utils/apiRequests";

const Form = ({ article_id, setCommentsToArticle, userName }) => {
  const [commentBody, setCommentBody] = useState("");
  const [postingMSG, setPostingMSG] = useState({
    status: false,
    msg: "",
    className: "",
  });
  const [status, setStatus] = useState("default");

  const userAlerts = {
    default: {
      className: "",
    },
    error: {
      status: false,
      msg: "Ooops, something wrong.",
      className: "error",
    },
    warning: {
      status: false,
      msg: "Comment field is empty",
      className: "warning",
    },
    success: { status: true, msg: "posting ...", className: "success" },
  };

  useEffect(() => {
    setPostingMSG(userAlerts[status]);
  }, [status]);

  const newCommentHandler = (e) => {
    e.preventDefault();
    const postBody = {
      username: userName,
      body: commentBody,
    };

    if (userName && commentBody) {
      setStatus("success");
      postComment(article_id, postBody)
        .then(({ data: { posted_comment } }) => {
          setCommentsToArticle((currentComments) => {
            return [posted_comment, ...currentComments];
          });
          setCommentBody("");
        })
        .catch((err) => {
          setStatus("error");
        });
    } else {
      setStatus("warning");
    }
  };

  const commentBodyHandler = (e) => {
    setCommentBody(e.target.value);
  };

  return (
    <>
      <form method="POST" className="new-comment" onSubmit={newCommentHandler}>
        <label>
          {" "}
          {userName} Says:
          <textarea
            type="text"
            name="new-comment-body"
            className="text-area"
            placeholder="... add your comment ..."
            onChange={commentBodyHandler}
            value={commentBody}
          />
        </label>
        <button tabIndex={"0"} className="button">
          Add
        </button>
        <section className={postingMSG.className}>{postingMSG.msg}</section>
      </form>
    </>
  );
};
export default Form;
