import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        {/* Simple Header */}
        <header className="bg-black text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-widest">SROW GYM</h1>
          <nav>
            <a href="/" className="hover:text-gray-300">Shop</a>
          </nav>
        </header>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto py-10 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* You can add a Product Page route here later */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;