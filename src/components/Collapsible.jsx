import { useState } from "react";

const Collapsible = ({ children }) => {
  const [isHidden, setIsHidden] = useState(true);

  const setHidden = () => {
    setIsHidden(!isHidden);
  };
  return <div onClick={setHidden}>{isHidden ? children[0] : children}</div>;
};

export default Collapsible;
