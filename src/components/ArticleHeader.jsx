import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { voteOnArticle } from "../utils/apiRequests";

const ArticleHeader = ({ article }) => {
  // const [currentVote, setCurrentVote] = useState(article.votes);
  // const [updateVote, setUpdateVote] = useState("");

  // const [click, setClick] = useState(false);

  // const [isVoted, setIsVoted] = useState(false);

  // useEffect(() => {
  //   let voting = 0;

  //   if (updateVote === "+" && !isVoted) {
  //     voting = 1;
  //     setIsVoted(true);
  //   } else if (updateVote === "-" && !isVoted) {
  //     voting = -1;
  //     setIsVoted(true);
  //   }

  //   voteOnArticle(article.article_id, voting).then(({ votes }) => {
  //     setCurrentVote(votes);
  //   });
  // }, [click]);

  // const votingHandling = (e) => {
  //   setUpdateVote(e.target.innerText);
  //   setClick(!click);
  // };

  return (
    <li key={article.article_id}>
      <h2>{article.title}</h2>

      <span className="rating votes">{article.votes}</span>

      <Link
        className="singleArticle"
        to={`/articles/${article.article_id}`}
      ></Link>
    </li>
  );
};

export default ArticleHeader;
