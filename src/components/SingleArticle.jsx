import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, voteOnArticle } from "../utils/apiRequests";

import Collapsible from "./Collapsible";
import Comments from "./Comments";

import "./styles/singleArticle.css";

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateVote, setUpdateVote] = useState("");
  const [currentVote, setCurrentVote] = useState(article.votes);

  const [response, setResponse] = useState("");

  const params = useParams();
  const { article_id } = params;

  const [click, setClick] = useState(false);
  const [isVoted, setIsVoted] = useState(false);

  const votingHandling = (e) => {
    setUpdateVote(e.target.innerText);
    setClick(!click);
  };

  useEffect(() => {
    getArticleById(article_id).then((data) => {
      const dateCreated = data.created_at.split("T");
      data.created_at = dateCreated[0];
      setArticle(data);
    });
    setIsLoading(false);
  }, [currentVote]);

  useEffect(() => {
    let voting = 0;
    if (updateVote === "+" && !isVoted) {
      voting = 1;
      setIsVoted(true);
    } else if (updateVote === "-" && !isVoted) {
      voting = -1;
      setIsVoted(true);
    }

    if (article.article_id) {
      setResponse("Thank you for voting");
      voteOnArticle(article.article_id, voting)
        .then(({ votes }) => {
          setCurrentVote(votes);
        })
        .catch((err) => {
          setResponse("ERROR");
        });
    }
  }, [click]);

  if (isLoading)
    return (
      <section className="all-articles"> .. Article is loading .. </section>
    );
  return (
    <section className="article">
      <h2>{article.title}</h2>
      <img src={article.article_img_url} alt={article.title} />
      <p className="article-body">{article.body}</p>
      <div className="article-summary article-footer-box">
        <div>topic: {article.topic}</div>
        <div>{article.author}</div>
        <div>{article.created_at}</div>
      </div>
      <div className="user-response">{response ? response : ""}</div>
      <Collapsible>
        <div className="article-interactive article-footer-box">
          <p className="votes-box votes">
            <span className="rating add" onClick={votingHandling}>
              +
            </span>
            <span className="votes">{article.votes}</span>

            <span className="rating minus" onClick={votingHandling}>
              -
            </span>
          </p>

          <div className="button" id="comments">
            Comments: {article.comment_count}
          </div>
        </div>
        <Comments article_id={article_id} />
      </Collapsible>
    </section>
  );
};

export default SingleArticle;
