import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LostItems from './pages/LostItems';
import FoundItems from './pages/FoundItems';
import ReportItem from './pages/ReportItem';
import Footer from './components/Footer';
import { SearchProvider } from './context/SearchContext';

const App: React.FC = () => {
    return (
        <SearchProvider>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/lost-items" element={<LostItems />} />
                        <Route path="/found-items" element={<FoundItems />} />
                        <Route path="/report-item" element={<ReportItem />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </SearchProvider>
    );
};

export default App;