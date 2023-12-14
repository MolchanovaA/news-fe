import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAll, getAllQuery } from "../utils/apiRequests";

import { useSearchParams } from "react-router-dom";

import "./styles/articles.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams({ topic: "" });

  useEffect(() => {
    let query = "articles";
    if (searchParams.get("topic")) {
      query += `?topic=${searchParams.get("topic")}`;
    }
    getAll(query).then((data) => {
      setArticles(data["articles"]);
      setIsLoading(false);
    });
  }, [searchParams.get("topic")]);

  if (isLoading)
    return (
      <section className="all-articles"> .. Articles are loading .. </section>
    );
  return (
    <section className="all-articles">
      <h1>Main Articles</h1>
      <p> View all articles in our page </p>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <h2>{article.title}</h2>
              <p className="votes">{article.votes}</p>
              <Link
                className="singleArticle"
                to={`/articles/${article.article_id}`}
              ></Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Articles;
