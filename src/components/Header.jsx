import { Link } from "react-router-dom";
import logo from "./../pics/news.svg";
import "./styles/header.css";

const Header = () => {
  return (
    <nav className="header-nav box">
      <Link to="/">
        {" "}
        <img src={logo} alt="news logo" className="logo" />
      </Link>
      <Link>Topics</Link>
      <Link to="/articles">All Articles</Link>
      <Link>Random Article</Link>
    </nav>
  );
};
export default Header;
