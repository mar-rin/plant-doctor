import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/home";
import Plants from "./components/plants";
import Shop from "./components/shop";
import Navbar from "./components/navBar";
import {collection, getDocs, addDoc} from "firebase/firestore";
import {db} from './Utils/firebase';
import './plantDoctor.css';
import LogInPage from "./components/logInPage";
import AccountDrawer from "./components/account";
import backGround from './images/backGround.png'
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
        <div className="App"
             style={{
                 backgroundImage:`url(${backGround})`,
                 backgroundRepeat:"no-repeat",
                 backgroundSize:"cover",
                 width: '100vw',
                 height: '100vh',
                 backgroundPosition: 'center',
                }}>
            <Navbar />
            <AccountDrawer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-plants"  element={<Plants allPlants={plants} />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/login" element={<LogInPage />} />
            </Routes>
        </div>

    );
}

export default App;
