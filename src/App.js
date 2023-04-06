import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import Plants from "./Plants";
import Shop from "./Shop";
import Navbar from "./Navbar";

function App() {

    const navigate = useNavigate();

    return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-plants" element={<Plants />} />
            <Route path="/shop" element={<Shop />} />
        </Routes>
    </div>

  );
}

export default App;
