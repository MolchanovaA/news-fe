import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/apiRequests";

import Collapsible from "./Collapsible";
import Comments from "./Comments";

import "./styles/singleArticle.css";

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const { article_id } = params;

  useEffect(() => {
    getArticleById(article_id).then((data) => {
      const dateCreated = data.created_at.split("T");
      data.created_at = dateCreated[0];
      setArticle(data);
    });
    setIsLoading(false);
  }, []);
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
      <Collapsible>
        <div className="article-interactive article-footer-box">
          <div className="button">Votes: {article.votes}</div>
          <div className="button">Comments: {article.comment_count}</div>
        </div>
        <Comments article_id={article_id} />
      </Collapsible>
    </section>
  );
};

export default SingleArticle;
