import { Link } from "react-router-dom";
import logo from "./../pics/news.svg";
import "./styles/header.css";
import { useEffect } from "react";

const Header = () => {
  const update = () => {
    useEffect(() => {}, []);
  };
  return (
    <nav className="header-nav box">
      <Link to="/">
        {" "}
        <img src={logo} alt="news logo" className="logo" />
      </Link>
      <Link to="/topics">Topics</Link>
      <Link to="/articles" onClick={update}>
        All Articles
      </Link>
    </nav>
  );
};
export default Header;
