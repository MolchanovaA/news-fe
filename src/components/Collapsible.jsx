import { useState } from "react";

const Collapsible = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const setVisible = (e) => {
    if (e.target.id === "comments" || e.target.id === "hide") {
      setIsVisible(!isVisible);
    } else if (e.target.id === "createComment") {
      if (isCreate) {
        e.target.innerText = "Show Form";
      } else {
        e.target.innerText = "Hide Form";
      }

      setIsCreate(!isCreate);
    }
  };
  return (
    <div onClick={setVisible}>
      {isVisible || isCreate ? children : children[0]}
    </div>
  );
};

export default Collapsible;
