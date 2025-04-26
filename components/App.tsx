import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./Navbar";
import HomePage from "../pages/HomePage";
import PortfolioPage from "../pages/PortfolioPage";
import SEO from "./SEO";

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <SEO />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
};

export default App;
