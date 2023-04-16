import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/home";
import Plants from "./Plants";
import Shop from "./Shop";
import Navbar from "./components/navBar";
import {collection, doc, setDoc, getDocs} from "firebase/firestore";
import {db} from './Utils/firebase';
import './plantDoctor.css';
import LogInPage from "./components/logInPage";
import backGround from './images/backGround.png';
import moment from 'moment';



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
    const [reallyUsefulDates, setReallyUsefulDates] = useState([]);
    const [activeDate, setActiveDate] = useState("");
    const sessionDates = JSON.parse(sessionStorage.getItem("dates"));
    const [activeDuties, setActiveDuties] = useState([]);
    const [dutiesByPlant, setDutiesByPlant] = useState([]);
    const sessionDuties = JSON.parse(sessionStorage.getItem("duties"));
    let wateringStep = 7;
    let pottingStep = 225;
    let fertingStep = 180;
    const today = new Date();
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
            setReallyUsefulDates(sessionDates);
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
                const relevantDates = dateMultiplier(userPlants);
        /*        console.log("RelevantDates: " + relevantDates)*/
                const duties = findDuties(relevantDates);
                sessionStorage.setItem("user", JSON.stringify(result[0]));
                sessionStorage.setItem("userPlants", JSON.stringify(userPlants));
                sessionStorage.setItem("dates", JSON.stringify(relevantDates));
                sessionStorage.setItem("duties", JSON.stringify(duties));
                setTimeout(() => {
                    setLoggedIn(true);
                }, 2500);

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
    function findDuties(relevantDates) {
        const newDuties = relevantDates.map(obj => {
            return {
                name: obj.name,
                duty: obj.duty,
                time: new Date(obj.time).toLocaleDateString('en-GB'),
                }
        });
        setDutiesByPlant(newDuties);
        console.log("1 of DBP: " + newDuties[0].name)
        console.log("1 of DBP: " + newDuties[0].duty)
        console.log("1 of DBP: " + newDuties[0].time)
        return newDuties
    }

    function dateMultiplier(plants){
        const waterDates = findWateringDates(plants);
        const fertDates = findFertingDates(plants);
        const potDates = findRepottingDates(plants);
        const mergedDates =[...waterDates, ...potDates, ...fertDates];
        const onlyFutureDates = mergedDates.filter(item => item.time > today.getTime());
        setReallyUsefulDates(onlyFutureDates);
        return onlyFutureDates;
    }

    function findWateringDates(plants){
        let adjustedStep = 0;
        switch(humidity){
            case 0:
                adjustedStep = wateringStep * 0.3;
                break;
            case 25:
                adjustedStep = wateringStep * 0.65;
                break;
            case 50:
                adjustedStep = wateringStep;
                break;
            case 75:
                adjustedStep = wateringStep * 1.35;
                break;
            case 100:
                adjustedStep = wateringStep * 1.7;
                break;
            default:
                break;
        }
        console.log("Humidity " + humidity)
        console.log("Adjusted step " + adjustedStep)
        const newWaterDates = plants.map((item)=>{
            return {
                name: item.name,
                duty: "watering",
                time: item.watering.toDate().getTime()
        }});
        const size = newWaterDates.length;
        const multiplier = adjustedStep * 24 * 60 * 60 * 1000;
        for (let i = 0; i < size; i++){
            for (let j = 1; j < 5; j++) {
                const newDate = {
                    name: newWaterDates[i].name,
                    duty: "watering",
                    time: newWaterDates[i].time + (multiplier * j)
                }
                newWaterDates.push(newDate);
            }
        }
        setWateringDates(newWaterDates);
        return newWaterDates;
    }


    function findRepottingDates(plants){
        const newRepotDates = plants.map((item)=>{
            return {
                name: item.name,
                duty: "repot",
                time: item.repot.toDate().getTime()
            }});
        const size = newRepotDates.length;
        const multiplier = pottingStep * 24 * 60 * 60 * 1000;
        for (let i = 0; i < size; i++){
            for (let j = 1; j < 7; j++) {
                const newDate = {
                    name: newRepotDates[i].name,
                    duty: "repot",
                    time: newRepotDates[i].time + (multiplier * j)
                }
                newRepotDates.push(newDate);
            }
        }
        setPottingDates(newRepotDates);
        return newRepotDates;
    }


    function findFertingDates(plants){
        const newFertingDates = plants.map((item)=>{
            return {
                name: item.name,
                duty: "fertilizing",
                time: item.fertilizing.toDate().getTime()
            }});
        const size = newFertingDates.length;
        const multiplier = fertingStep * 24 * 60 * 60 * 1000;
        for (let i = 0; i < size; i++){
            for (let j = 1; j < 3; j++) {
                const newDate = {
                    name: newFertingDates[i].name,
                    duty: "fertilizing",
                    time: newFertingDates[i].time + (multiplier * j)
                }
                newFertingDates.push(newDate);
            }
        }
        setFertingDates(newFertingDates);
        return newFertingDates;
    }




//HANDLING CLICKS ON THE CALENDAR
    function pickedDate(e) {
        const userPicked = new Date(e);
        const daySelected = moment(userPicked).format('DD/MM/YYYY');
        setActiveDate(daySelected);
        setOpen(true);
        findWateringDates(plants)
    }


    function showDuties(){
        const toDoOnThisDay = dutiesByPlant.filter((item) => (item.time===activeDate));
        toDoOnThisDay
            .filter((item) => (item.duty==="watering"))
            .map((item) => (foundWater.push(item.name)));
        toDoOnThisDay
            .filter((item) => (item.duty==="fertilizing"))
            .map((item) => (foundFert.push(item.name)));
        toDoOnThisDay
            .filter((item) => (item.duty==="repot"))
            .map((item) => (foundPot.push(item.name)));
    }

    if(activeDate && activeDuties){
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
        if (e.target.value === humidity){
            console.log("Watercycle stays the same")
        } else {
            setHumidity(e.target.value);
            dateMultiplier(plants);
        }

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
                        reallyUsefulDates={reallyUsefulDates}
                    />} />
                    <Route path="/my-plants"  element={<Plants
                        user={activeUser}
                        plants={plants}
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
