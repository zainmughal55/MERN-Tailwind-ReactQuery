import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/home";
import About from "./routes/About/about";
import Navbar from "./components/Navbar/navbar";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <div className="p-10 sm:p-20">
          <Navbar />
          <div className="bg-slate-100 rounded-br-2xl rounded-bl-2xl p-5">
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
