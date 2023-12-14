import { useState, useEffect } from "react";
import { getAll } from "../utils/apiRequests";
import { Link } from "react-router-dom";

import "./styles/articles.css";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAll("topics").then((data) => {
      setTopics(data["topics"]);
      setIsLoading(false);
    });
  }, []);

  if (isLoading)
    return (
      <section className="all-articles"> .. Topics are loading .. </section>
    );
  return (
    <section className="all-articles">
      <h1>Main Topics</h1>
      <p> View all topics in our page </p>
      <ul>
        {topics.map((topic, i) => {
          return (
            <li key={i}>
              <h2>{topic.slug}</h2>
              <p>{topic.description}</p>
              <Link
                className="singleArticle"
                to={`/articles?topic=${topic.slug}`}
              ></Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Topics;
