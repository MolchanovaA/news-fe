import { Route, Routes } from "react-router-dom";

import Articles from "../Articles";
import SingleArticle from "../SingleArticle";
import Home from "../Home";

const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="api/articles" element={<Articles />} />
        <Route path="api/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </>
  );
};

export default RoutesComponent;
