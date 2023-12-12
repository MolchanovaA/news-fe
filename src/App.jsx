import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./components/routes/RutesComponent";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <RoutesComponent />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
