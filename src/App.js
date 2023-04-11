import React, {useEffect, useState} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
                //console.log(cities, newData);
            })

    }
   /* async function addToFirebase() {

        try {
            const docRef = await addDoc(collection(db, "cities"), {
                name: newCity,
                nbr: newCityNbr
            });
            // console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            // console.error("Error adding document: ", e);
        }
    }*/
    useEffect(()=>{
        fetchPlants();

    },[])


//console.log(plants)
    return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-plants" element={<Plants allPlants={plants} />} />
            <Route path="/shop" element={<Shop />} />
        </Routes>
    </div>

  );
}

export default App;
