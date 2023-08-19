import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateNote from "./routes/CreateNote/CreateNote";
import Navbar from "./components/Navbar/navbar";
import Notes from "./routes/Notes/notes";
import Note from "./routes/Note/note";
import About from "./routes/About/about";
import "./App.css";
import UpdateNote from "./routes/UpdateNote/UpdateNote";

function App() {
  return (
    <>
      <Router>
        <div className="p-10 sm:p-20">
          <Navbar />
          <div className="bg-slate-100 rounded-br-2xl rounded-bl-2xl p-5">
            <Routes>
              <Route index path="/" element={<Notes />} />
              <Route path="/create-note" element={<CreateNote />} />
              <Route path="/update-note/:id" element={<UpdateNote />} />
              <Route path="/:id" element={<Note />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
