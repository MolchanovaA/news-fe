import { useState, useEffect } from "react";
import { getArticles } from "../utils/apiRequests";

import "./styles/articles.css";
import ArticleHeader from "./ArticleHeader";

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
          return <ArticleHeader key={article.article_id} article={article} />;
        })}
      </ul>
    </section>
  );
};

export default Articles;
