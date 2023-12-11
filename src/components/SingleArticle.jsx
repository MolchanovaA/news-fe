import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/apiRequests";

import "./styles/singleArticle.css";

const SingleArticle = () => {
  const [article, setArticle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");

  const params = useParams();
  const { article_id } = params;

  useEffect(() => {
    getArticleById(article_id).then((data) => {
      setArticle(data);
      const dateCreated = data.created_at.split("T");
      setDate(dateCreated[0]);
    });
    setIsLoading(false);
  }, []);
  if (isLoading)
    return (
      <section className="all-articles"> .. Articles are loading .. </section>
    );
  return (
    <section className="article">
      <h2>{article.title}</h2>

      <img src={article.article_img_url} alt={article.title} />
      <p className="article-body">{article.body}</p>

      <div className="article-summary article-footer-box">
        <div>topic: {article.topic}</div>
        <div>{article.author}</div>
        <div>{date}</div>
      </div>
      <div className="article-interactive article-footer-box">
        <div>votes : {article.votes}</div>
        <div>Comments: {article.comment_count}</div>
      </div>
    </section>
  );
};

export default SingleArticle;
