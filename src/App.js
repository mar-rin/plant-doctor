import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/home";
import Plants from "./Plants";
import Shop from "./Shop";
import Navbar from "./components/navBar";
import {collection, getDocs, addDoc} from "firebase/firestore";
import {db} from './Utils/firebase';
import './plantDoctor.css';
import Account from "./components/account";
import fullLogo from "./images/fullLogo.png";
import LogInPage from "./components/logInPage";

function App() {

    const navigate = useNavigate();
    const [plants, setPlants] = useState([])
    async function fetchPlants() {

        await getDocs(collection(db, "plants"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id: doc.id}));
                setPlants(newData);
            })

    }

    useEffect(()=>{
        fetchPlants();

    },[])

    return (
    <div className="App">
        <img src={fullLogo} alt="Logo" className="mainLogo"/>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-plants"  element={<Plants allPlants={plants} />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<LogInPage />} />
        </Routes>
    </div>

  );
}

export default App;
