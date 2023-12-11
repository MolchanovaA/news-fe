import { useState, useEffect } from "react";

import { getArticles } from "../utils/apiRequests";

import "./styles/articles.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getArticles().then((data) => {
      setArticles(data);
      console.log(data);
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
            <li key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.votes}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Articles;
