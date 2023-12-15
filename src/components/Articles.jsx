import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAll } from "../utils/apiRequests";

import { useSearchParams } from "react-router-dom";

import ErrorPage from "./ErrorPage";

import "./styles/articles.css";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({ topic: "" });
  const [order, setOrder] = useState("desc");
  const [sortQuery, setSortQuery] = useState({
    sortby: "created_at",
    category: searchParams.get("topic"),
    order_by: order,
  });

  const [errorPage, setErrorPage] = useState({ msg: "", code: "" });

  const sortByHandler = (e) => {
    setSortQuery({ ...sortQuery, sortby: e.target.value });
  };

  const orderByByHandler = (e) => {
    setSortQuery({ ...sortQuery, order_by: e.target.value });
  };

  useEffect(() => {
    let queryTopic = "articles";
    setTitle(queryTopic);
    const { sortby, category, order_by } = sortQuery;
    let commentsSorting = sortby === "comment_count" ? true : false;
    if (category) {
      setTitle(searchParams.get("topic"));
      queryTopic += commentsSorting
        ? `?topics=${category}`
        : `?topics=${category}&sorted_by=${sortby}&order_by=${order_by}`;
    } else if (!commentsSorting && !category) {
      queryTopic += `?sorted_by=${sortby}&order_by=${order_by}`;
    }

    getAll(queryTopic)
      .then((data) => {
        if (commentsSorting) {
          data.articles.sort((a, b) => {
            if (order_by === "asc") {
              return b.comment_count - a.comment_count;
            } else {
              return a.comment_count - b.comment_count;
            }
          });
        }
        setArticles(data["articles"]);
        setIsLoading(false);
      })
      .catch(({ response }) => {
        setErrorPage({ msg: response.data.msg, code: response.status });
      });
  }, [sortQuery]);

  if (errorPage.code) {
    return <ErrorPage msg={errorPage.msg} code={errorPage.code} />;
  }

  if (isLoading)
    return (
      <section className="all-articles"> .. Articles are loading .. </section>
    );

  return (
    <section className="all-articles">
      <h1>{title.toUpperCase()}</h1>
      <p>
        {" "}
        View all{" "}
        {searchParams.get("topic")
          ? `${searchParams.get("topic")} related`
          : ``}{" "}
        articles in our page{" "}
      </p>
      <div className="sortingQueries">
        <form action="GET" onChange={sortByHandler}>
          <label>
            Sort By
            <select name="sorting_option">
              {" "}
              <option value="created_at" defaultValue>
                Date
              </option>
              <option value="comment_count">Discussions</option>
              <option value="votes">Votes</option>
            </select>
          </label>
        </form>
        <form action="GET" onChange={orderByByHandler}>
          <label>
            Sort By
            <select name="orderBy_option">
              {" "}
              <option value="asc">ASC</option>
              <option value="desc" defaultValue>
                DESC
              </option>
            </select>
          </label>
        </form>
      </div>
      <ul>
        {articles.map((article) => {
          return (
            <li key={article.article_id}>
              <h2>{article.title}</h2>
              <p className="votes">Votes: {article.votes}</p>
              <p className="votes">Comments: {article.comment_count}</p>
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
