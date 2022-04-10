import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./screens/MainMenu";
import SocketTest from "./screens/SocketTest";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/socket" element={<SocketTest />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
