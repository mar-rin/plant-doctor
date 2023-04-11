import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import Plants from "./Plants";
import Shop from "./Shop";
import Navbar from "./Navbar";
import {collection, getDocs, addDoc} from "firebase/firestore";
import {db} from './Utils/firebase';


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
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-plants"  element={<Plants allPlants={plants} />} />
            <Route path="/shop" element={<Shop />} />
        </Routes>
    </div>

  );
}

export default App;
