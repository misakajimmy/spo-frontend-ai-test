import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Platforms from './pages/Platforms';
import Accounts from './pages/Accounts';
import Resources from './pages/Resources';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/resources" element={<Resources />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
