import { useEffect, useState } from "react";
import { deleteComment } from "../utils/apiRequests";

const Comment = ({ comment, userName }) => {
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

    success: { status: true, msg: "deleted ...", className: "success" },
  };

  useEffect(() => {
    setPostingMSG(userAlerts[status]);
  }, [status]);

  const commentDeleteHandler = () => {
    setStatus("success");
    deleteComment(comment.comment_id).catch(() => {
      setStatus("error");
    });
  };

  return (
    <li className="comment">
      <div className="section-comments-author">
        {comment.author} {comment.comment_id}
      </div>
      <p className="section-comments-body"> {comment.body}</p>
      <div className="section-comments-votes">
        Votes : <span>{comment.votes}</span>
      </div>
      <div>{postingMSG.msg}</div>
      <div
        className="button delete "
        hidden={comment.author === userName ? false : true}
        onClick={commentDeleteHandler}
      >
        delete
      </div>
    </li>
  );
};

export default Comment;
