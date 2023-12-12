import { Route, Routes } from "react-router-dom";

import WebTemplate from "../WebTemplate";
import Articles from "../Articles";
import SingleArticle from "../SingleArticle";

const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/api/" element={<WebTemplate />}>
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:article_id" element={<SingleArticle />} />
        </Route>
      </Routes>
    </>
  );
};

export default RoutesComponent;
