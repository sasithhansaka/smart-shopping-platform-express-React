import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AuthenticationPage from "./pages/AuthenticationPage";
import NotFound from "./pages/NotFound";
import OrderPage from "./pages/OrderPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthenticationPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;


// {
//   "email": "sasithhansaka2285@gmail.com",
//   "username":"sasithh",
//   "password":"Str0ng!P@ssw0rd"
// }


// seller id =67e53d69e6c9ad24fd658a39