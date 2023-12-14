import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://molchanova-nc-news.onrender.com/api",
});

export const getAll = (searchAll) => {
  return newsApi.get(`/${searchAll}`).then(({ data }) => data);
};

export const getAllQuery = (searchAll) => {
  return newsApi.get(`/${searchAll}`).then(({ data }) => {
    console.log(data, "QUERY");
  });
};

export const getArticleById = (id) => {
  return newsApi.get(`/articles/${id}`).then(({ data }) => data.article);
};

export const getCommentsByArticleId = (id) => {
  return newsApi
    .get(`/articles/${id}/comments`)
    .then(({ data }) => data.comments);
};

export const voteOnArticle = (id, votes) => {
  return newsApi
    .patch(`/articles/${id}`, { inc_votes: votes })
    .then(({ data: { article } }) => article);
};

export const postComment = (id, body) => {
  return newsApi.post(`/articles/${id}/comments`, body);
};

export const deleteComment = (id) => {
  return newsApi.delete(`/comments/${id}`);
};
