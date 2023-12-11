import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://molchanova-nc-news.onrender.com/api",
});

export const getCategories = () => {
  return newsApi.get("/articles").then(({ data }) => data);
};
