import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById, voteOnArticle } from "../utils/apiRequests";

import Collapsible from "./Collapsible";
import Comments from "./Comments";
import ErrorPage from "./ErrorPage";

import "./styles/singleArticle.css";

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentVote, setCurrentVote] = useState(article.votes);
  const [errorPage, setErrorPage] = useState({ msg: "", code: "" });

  const [response, setResponse] = useState("");

  const params = useParams();

  const { article_id } = params;

  const [isVoted, setIsVoted] = useState(false);

  const votingHandling = (e) => {
    let voting = 0;
    let votesOnPage = article.votes;
    if (e.target.innerText === "+" && !isVoted) {
      voting = 1;
      votesOnPage++;
      setIsVoted(true);
    } else if (e.target.innerText === "-" && !isVoted) {
      voting = -1;
      votesOnPage--;
      setIsVoted(true);
    }
    if (!isVoted) {
      setResponse("Thank you for voting");
      setCurrentVote(votesOnPage);
      voteOnArticle(article.article_id, voting).catch((err) => {
        setResponse("ERROR");
      });
    }
  };

  useEffect(() => {
    getArticleById(article_id)
      .then((data) => {
        const dateCreated = data.created_at.split("T");
        data.created_at = dateCreated[0];
        setArticle(data);
        setCurrentVote(data.votes);
      })
      .catch(({ response }) => {
        setErrorPage({ msg: response.data.msg, code: response.status });
      });

    setIsLoading(false);
  }, []);

  if (isLoading)
    return (
      <section className="all-articles"> .. Article is loading .. </section>
    );

  if (errorPage.code) {
    return <ErrorPage msg={errorPage.msg} code={errorPage.code} />;
  }
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
            <span className="votes">{currentVote}</span>

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
