import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as React from "react";
import MainMenu from "./screens/MainMenu";
import SignupScreen from "./screens/SignupScreen";

function App() {
  return (
    <Suspense fallback={null}>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/signup" element={<SignupScreen />} />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
