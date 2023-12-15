import { Link } from "react-router-dom";
import "./styles/footer.css";
const Footer = () => {
  return (
    <footer className="box">
      {" "}
      <Link target="_blank" to="https://github.com/MolchanovaA/news-api">
        Backend
      </Link>
      <Link target="_blank" to="https://github.com/MolchanovaA/news-fe">
        Frontend
      </Link>
      <Link target="_blank" to="https://molchanova-cv-project.netlify.app/">
        Molchanova.2023
      </Link>
    </footer>
  );
};

export default Footer;
