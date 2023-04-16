import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/home";
import Plants from "./Plants";
import Shop from "./Shop";
import Navbar from "./components/navBar";
import {collection, doc, setDoc, getDocs} from "firebase/firestore";
import {db} from './Utils/firebase';
import './plantDoctor.css';
import Account from "./components/account";
import fullLogo from "./images/fullLogo.png";
import LogInPage from "./components/logInPage";
import AccountDrawer from "./components/account";
import backGround from './images/backGround.png';
import moment from 'moment';
import * as timeFunction from '../src/components/timeFunctions';


function App() {

//states for user
    const usersRef = collection(db, "users");
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [activeUser, setActiveUser] = useState("");
    const sessionUser = JSON.parse(sessionStorage.getItem("user"));
//states for plants
    const plantsRef = collection(db, "plants");
    const [allPlants, setAllPlants] = useState([]);
    const [plants, setPlants] = useState([]);
    const sessionUserPlants = JSON.parse(sessionStorage.getItem("userPlants"));
    const [wateringDates, setWateringDates] = useState([]);
    const [pottingDates, setPottingDates] = useState([]);
    const [fertingDates, setFertingDates] = useState([]);
    let foundWater = [];
    let foundFert = [];
    let foundPot = [];
    const [humidity, setHumidity] = useState(50);
//states for dates
    const [usefulDates, setUsefulDates] = useState([]);
    const [activeDate, setActiveDate] = useState("");
    const sessionDates = JSON.parse(sessionStorage.getItem("dates"));
    const [dutiesByPlant, setDutiesByPlant] = useState([]);
    const sessionDuties = JSON.parse(sessionStorage.getItem("duties"));
    let wateringStep = 7;
    let pottingStep = 225;
    let fertingStep = 180;
//states for interactive elements
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(false);




//IF SESSION IN PROGRESS, UPDATES FROM SESSION DATA
//IF NEW SESSION, FETCHES DATA
    useEffect(()=>{
        async function fetchUsers() {
            await
                getDocs(usersRef)
                    .then((querySnapshot) => {
                        const newData = querySnapshot.docs
                            .map((doc) => ({...doc.data(), id: doc.id}));
                        setRegisteredUsers(newData);
                    })
            }
        async function fetchPlants() {
            await
                getDocs(plantsRef)
                    .then((querySnapshot) => {
                        const newData = querySnapshot.docs
                            .map((doc) => ({...doc.data(), id: doc.id}));
                        setAllPlants(newData);
                    })};
        if (sessionUser) {
            setLoggedIn(true);
            setActiveUser([sessionUser])
            setPlants(sessionUserPlants);
            setUsefulDates(sessionDates);
            setDutiesByPlant(sessionDuties);
        } else {
            fetchUsers();
            fetchPlants();}
    },[])



//HANDLING LOGIN & SIGNUP
    async function handleLogIn (event) {
        if (allPlants && registeredUsers) {
            event.preventDefault();
            const input = new FormData(event.currentTarget);
            const result = registeredUsers.filter((user) =>
                user.password===input.get("password") && user.username===input.get("username"));
            if (result.length>0) {
                setActiveUser(result);
                const userPlants = allPlants.filter((plant) => plant.owner===input.get("username"));
                setPlants(userPlants);
                let waterDates = findWateringDates(userPlants)
                setWateringDates(waterDates);
                let dates = findSchedule(userPlants);
                setUsefulDates(dates);
                let duties = findDuties(userPlants);
                setDutiesByPlant(duties);
                sessionStorage.setItem("user", JSON.stringify(result[0]));
                sessionStorage.setItem("userPlants", JSON.stringify(userPlants));
                sessionStorage.setItem("dates", JSON.stringify(dates));
                sessionStorage.setItem("duties", JSON.stringify(duties));
                setTimeout(() => {
                    setLoggedIn(true);
                }, 1500);

            } else {
                alert("These credentials are not registered. Check your username and password, or sign up below!")
            }
        }else{
            console.log("this is not good, wait a bit!")
    }}

    async function handleSignUp (event)  {
        event.preventDefault();
        const input = new FormData(event.currentTarget);
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regex.test(input.get("email"))){
            alert("The email you provided does not seem valid. Please check your input!")
        } else if (input.get("password").length<6){
            alert("The password you provided is too weak. Please enter a longer one!")
        } else {
            await setDoc(doc(usersRef, input.get("email")), {
                firstName: input.get("firstName"),
                lastName: input.get("lastName"),
                email: input.get("email"),
                password: input.get("password"),
                username: input.get("location")})
            const newUser = [{
                firstName: input.get("firstName"),
                lastName: input.get("lastName"),
                email: input.get("email"),
                password: input.get("password"),
                username: input.get("username")}];
            setActiveUser(newUser)
            setLoggedIn(true);
            sessionStorage.setItem("user", JSON.stringify(newUser));
        }
    }


//FINDING THE RELEVANT DATES & DUTIES
//DUTIES BY PLANT NAME
    function findDuties(userPlants) {
        return userPlants.map(obj => {
            return {
                name: obj.name,
                activities: {
                    watering: new Date (obj.watering.toDate()).toLocaleDateString('en-GB'),
                    repot: new Date (obj.repot.toDate()).toLocaleDateString('en-GB'),
                    fertilizing: new Date (obj.fertilizing.toDate()).toLocaleDateString('en-GB')
                }
            };
        });
    }

    function findWateringDates(userPlants){
        const newWaterDates = userPlants
            .map((item)=>(item.watering))
            .map((item)=>(item.toDate()))
            .map((item)=>(item.getTime()));
        const size = newWaterDates.length;
        const multiplier = wateringStep * 24 * 60 * 60 * 1000;
        for (let i = 0; i < size; i++){
            for (let j = 1; j < 5; j++) {
                let newDate = newWaterDates[i] + (multiplier * j)
                newWaterDates.push(newDate);
            }
        }
        return newWaterDates;
    }



    function findSchedule(userPlants) {
        let dates = [];
        userPlants.map((item) => {
            dates.push(item.repot.toDate())
            dates.push(item.watering.toDate())
            dates.push(item.fertilizing.toDate())
        });
        return dates;
    }

//HANDLING CLICKS ON THE CALENDAR
    function pickedDate(e) {
        const userPicked = new Date(e);
        const daySelected = moment(userPicked).format('DD/MM/YYYY');
        setActiveDate(daySelected);
        setOpen(true);
    }

    function showDuties(){
        console.log("DBP first, from inside the CalendarClick: " + dutiesByPlant[0])
        dutiesByPlant
            .filter((item) => (item.activities.watering===activeDate))
            .map((item) => (foundWater.push(item.name)));
        dutiesByPlant
            .filter((item) => (item.activities.fertilizing===activeDate))
            .map((item) => (foundFert.push(item.name)));
        dutiesByPlant
            .filter((item) => (item.activities.repot===activeDate))
            .map((item) => (foundPot.push(item.name)));
    }

    if(activeDate && sessionDuties){
        showDuties()
    } else {
            console.log("No active date present!")
        }

    function handleClose () {
        setClose(true);
        setActiveDate("")
    }


//HANDLING HUMIDITY CHANGE
    function handleHumidity(e) {
        setHumidity(e.target.value)
    }


//RENDERING OF ROOT
    return (
        <div className="App"
             style={{
/*                 backgroundImage:`url(${backGround})`,
                 backgroundRepeat:"no-repeat",
                 backgroundSize:"cover",
                 width: '100vw',
                 height: '100vh',
                 backgroundPosition: 'center',*/
             }}
        >
        { (loggedIn)
        ? ( <>
           <Navbar
               activeUser={activeUser}
               sessionUserPlants={sessionUserPlants}
           />
                <Routes>
                    <Route path="/" element={<Home
                        user={activeUser}
                        plants={plants}
                        usefulDates={usefulDates}
                        pickedDate={pickedDate}
                        activeDate={activeDate}
                        open={open}
                        close={close}
                        handleClose={handleClose}
                        foundWater={foundWater}
                        foundPot={foundPot}
                        foundFert={foundFert}
                        humidity={humidity}
                        handleHumidity={handleHumidity}
                    />} />
                    <Route path="/my-plants"  element={<Plants
                        user={activeUser}
                        plants={plants}
                        usefulDates={usefulDates}
                        dutiesByPlant={dutiesByPlant}
                    />} />
                    <Route path="/shop" element={<Shop
                        user={activeUser}
                    />} />
{/*                    <Route path="/account" element={<Navbar
                        user={activeUser}
                        plants={plants}
                    />} />*/}
                </Routes>
            </>)
        : (<>
            <Routes>
                <Route path="/" element={<LogInPage
                    handleLogIn={handleLogIn}
                    handleSignUp={handleSignUp}
                />} />
            </Routes>
            </>)
        }
    </div>)
}

export default App;
