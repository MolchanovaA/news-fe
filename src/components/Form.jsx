import { useState, useEffect } from "react";
import { postComment } from "../utils/apiRequests";

const Form = ({ article_id, setAddComment }) => {
  const [userName, setUserName] = useState("tickle122");
  const [commentBody, setCommentBody] = useState("");
  const [errorMSG, setErrorMSG] = useState("");
  const [postingMSG, setPostingMSG] = useState("");
  const [emptyMSG, setEmptyMSG] = useState("");

  useEffect(() => {}, [errorMSG, postingMSG, emptyMSG]);

  const newCommentHandler = (e) => {
    e.preventDefault();
    const postBody = {
      username: userName,
      body: commentBody,
    };

    if (userName && commentBody) {
      setPostingMSG("posting comment");
      postComment(article_id, postBody)
        .then(({ data: { posted_comment } }) => {
          setAddComment(posted_comment);
          setCommentBody("");
        })
        .catch((err) => {
          setErrorMSG("Ooops, something wrong.");
        });
    } else {
      setEmptyMSG("Comment field is empty");
    }
  };

  const commentBodyHandler = (e) => {
    setCommentBody(e.target.value);
  };

  if (errorMSG || emptyMSG || postingMSG) {
    let alert = errorMSG || emptyMSG || postingMSG;
    const styles = {
      ["Ooops, something wrong."]: "error",
      ["Comment field is empty"]: "empty-field",
      ["posting comment"]: "posting",
    };

    return <section className={styles[alert]}>{alert}</section>;
  }

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
      </form>
    </>
  );
};
export default Form;
