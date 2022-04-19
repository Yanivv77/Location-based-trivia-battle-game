import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as React from "react";
import MainMenu from "./screens/MainMenu";
import SignupScreen from "./screens/SignupScreen";
import ProfileScreen from "./screens/ProfileScreen";
import GameLobbyScreen from "./screens/GameLobbyScreen";

function App() {
  return (
    <Suspense fallback={null}>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<MainMenu />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/gamelobby" element={<GameLobbyScreen />} />
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
