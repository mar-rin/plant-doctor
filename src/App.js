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
    const sessionUsername = sessionStorage.getItem("username");
    const sessionPassword = sessionStorage.getItem("password");
//states for plants
    const plantsRef = collection(db, "plants");
    const [allPlants, setAllPlants] = useState([]);
    const [plants, setPlants] = useState([]);
    const sessionUserPlants = sessionStorage.getItem("userPlants");
//states for dates
    const [usefulDates, setUsefulDates] = useState([20]);
    const [activeDate, setActiveDate] = useState("");
    const sessionDates = sessionStorage.getItem("dates");
    const [dutiesByPlant, setDutiesByPlant] = useState([]);
    const sessionDuties = JSON.parse(sessionStorage.getItem("duties"));
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
        if (sessionUsername && sessionPassword) {
            setLoggedIn(true);
            setActiveUser([{username: sessionUsername, password: sessionPassword}])
            setPlants(sessionUserPlants.split(","));
            setUsefulDates(sessionDates.split(","));
            setDutiesByPlant(sessionDuties);

        } else {
            fetchUsers();
            fetchPlants();}
    },[])



//HANDLING LOGIN & SIGNUP
    function handleLogIn (event) {
        event.preventDefault();
        const input = new FormData(event.currentTarget);
        const result = registeredUsers.filter((user) =>
            user.password===input.get("password") && user.username===input.get("username"));
        if (result.length>0) {
            setLoggedIn(true);
            setActiveUser(result);
            const userPlants = allPlants.filter((plant) => plant.owner===input.get("username"));
            let dates = findSchedule(userPlants);
            setUsefulDates(dates);
            let duties = findDuties(userPlants);
            setDutiesByPlant(duties);
/*            console.log("IS this Duties thing working? " + duties[0].activities.watering)*/
            //THis here is working as well
            sessionStorage.setItem("username", result[0].username);
            sessionStorage.setItem("password", result[0].password);
            sessionStorage.setItem("userPlants", userPlants);
            sessionStorage.setItem("dates", dates);
            sessionStorage.setItem("duties", JSON.stringify(duties));

        } else {
            alert("These credentials are not registered. Check your username and password, or sign up below!")}
    }

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
            setActiveUser([{
                firstName: input.get("firstName"),
                lastName: input.get("lastName"),
                email: input.get("email"),
                password: input.get("password"),
                username: input.get("username")}]);
            setLoggedIn(true);
            sessionStorage.setItem("username", input.get("username"));
            sessionStorage.setItem("password", input.get("password"));
        }
    }


//FINDING THE RELEVANT DATES & DUTIES
    function findDuties(userPlants) {
        let activitiesByPlant = userPlants.map(obj => {
            return {
                name: obj.name,
                activities: {
                    watering: obj.watering.toDate(),
                    repot: obj.repot.toDate(),
                    fertilizing: obj.fertilizing.toDate()
                }
            };
        });
        return activitiesByPlant;
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
        console.log("Active date after calendar click: " + daySelected);
        setOpen(true);
    }

    function handleClose () {
        setClose(true);
        setActiveDate("")
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
           <Navbar activeUser={activeUser} />
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
                    <Route path="/account" element={<Account
                        user={activeUser}
                        plants={plants}
                    />} />
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
