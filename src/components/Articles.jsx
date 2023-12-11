import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArticles } from "../utils/apiRequests";

import "./styles/articles.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getArticles().then((data) => {
      setArticles(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <section className="all-articles"> .. Articles are loading .. </section>
    );
  return (
    <section className="all-articles">
      <h1>Main Topics</h1>
      <p> View all articles in our page </p>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <h2>{article.title}</h2>
              <p className="votes">{article.votes}</p>
              <Link
                className="singleArticle"
                to={`/api/articles/${article.article_id}`}
              ></Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Articles;
