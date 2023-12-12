import { Route, Routes } from "react-router-dom";

import Articles from "../Articles";
import SingleArticle from "../SingleArticle";
import Home from "../Home";

const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </>
  );
};

export default RoutesComponent;
