import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InputPage from './pages/input.jsx';
import ResultPage from './pages/result.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
