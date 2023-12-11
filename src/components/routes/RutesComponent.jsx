import { Route, Routes } from "react-router-dom";

import WebTemplate from "../WebTemplate";
import TemplateBody from "../TemplateBody";
import Articles from "../Articles";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<WebTemplate />}>
        <Route path="api" element={<TemplateBody />} />
        <Route path="api/articles" element={<Articles />} />
      </Route>
    </Routes>
  );
};

export default RoutesComponent;
