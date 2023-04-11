import React from "react";
import './plantDoctor.css';
import {Routes} from "react-router-dom";
import {Route} from "react-router-dom";
import Home from "./components/home"
import Plants from "./components/plants";
import Shop from "./components/shop";
import Account from "./components/account";
import fullLogo from "./images/fullLogo.png";
import LogInPage from "./components/logInPage";

function App() {
    return (
        <div className='App'>
            <img src={fullLogo} alt="Logo" className="mainLogo"/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-plants" element={<Plants />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/account" element={<Account />} />
                <Route path="/login" element={<LogInPage />} />
            </Routes>
        </div>
    );
}

export default App;

