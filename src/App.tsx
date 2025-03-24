import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PopularDestinations from './pages/PopularDestinations';
import RouterProvider from './routes/RouterProvider'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular-destinations" element={<PopularDestinations />} />
        <Route path="*" element={<RouterProvider />} />
      </Routes>
    </Router>
  );
}

export default App;