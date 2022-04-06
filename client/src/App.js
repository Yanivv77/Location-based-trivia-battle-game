import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainMenu from './screens/MainMenu'

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<MainMenu />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
