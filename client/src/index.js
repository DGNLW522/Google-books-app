import React from "react";
import ReactDOM from "react-dom/client"; // Change to 'react-dom/client' for React 18+
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import BookDetails from "./BookDetails";

// React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/book/:id" element={<BookDetails />} />
    </Routes>
  </Router>
);

