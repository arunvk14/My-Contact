import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import NotFound from "./pages/NotFound";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/favorite" element={<Favorite />}></Route>
        <Route exact path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
