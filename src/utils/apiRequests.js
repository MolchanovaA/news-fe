import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://molchanova-nc-news.onrender.com/api",
});

export const getArticles = () => {
  return newsApi.get("/articles").then(({ data }) => data.articles);
};

export const getArticleById = (id) => {
  return newsApi.get(`/articles/${id}`).then(({ data }) => data.article);
};

export const getCommentsByArticleId = (id) => {
  return newsApi
    .get(`/articles/${id}/comments`)
    .then(({ data }) => data.comments);
};
