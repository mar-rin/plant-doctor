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
import LogInPage from "./components/logInPage";
import Cookies from "universal-cookie"

function App() {

    const navigate = useNavigate();
    const [plants, setPlants] = useState([]);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const usersRef = collection(db, "users");
    const plantsRef = collection(db, "plants");

    let cookies = new Cookies();

    const [activeUser, setActiveUser] = useState(cookies.get("activeUser"));

    async function fetchUsers() {
        await getDocs(usersRef)
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id: doc.id}));
                setRegisteredUsers(newData);
            })
    }

    async function fetchPlants() {
        await getDocs(plantsRef)
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id: doc.id}));
                setPlants(newData);
            })
    }

    useEffect(()=>{
        fetchUsers();
        fetchPlants();
    },[])


    function handleLogIn (event) {
        event.preventDefault();
        const input = new FormData(event.currentTarget);
        const result = registeredUsers.filter((user) =>
            user.password===input.get("password") && user.email===input.get("email"));
        if (result.length>0) {
            cookies.set("activeUser", result);
            setActiveUser(result);
        } else {
            alert("These credentials are not registered. Check your email and password, or sign up below!");
        }
        console.log("Plants[0] from App: " + plants[0].name)
        console.log("RegUsers[0].name from App: " + registeredUsers[0].firstName)
    }


    async function handleSignUp (event)  {
        event.preventDefault();
        const input = new FormData(event.currentTarget);
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regex.test(input.get("email"))) {
            alert("The email you provided does not seem valid. Please check your input!")
        } else if (input.get("password").length<6){
            alert("The password you provided is too weak. Please enter a longer one!")
        } else {
            let user = {
                firstName: input.get("firstName"),
                lastName: input.get("lastName"),
                email: input.get("email"),
                password: input.get("password"),
                location: input.get("location")
            };
            await setDoc(doc(usersRef, input.get("email")), user);
            cookies.set("activeUser", user);
            setActiveUser(user);
        }
    }
    return (
        <div className="App">
            { activeUser
            ? ( <>
               <Navbar
                   activeUser={activeUser} />
                    <Routes>
                        <Route path="/" element={<Home
                            user={activeUser}
                            allPlants={plants}
                        />} />
                        <Route path="/my-plants"  element={<Plants
                            user={activeUser}
                            allPlants={plants}
                        />} />
                        <Route path="/shop" element={<Shop
                            user={activeUser}
                        />} />
                        <Route path="/account" element={<Account
                            user={activeUser}
                            allPlants={plants}
                            logOut={() => {
                                cookies.remove("activeUser");
                                setActiveUser(null);
                                navigate("/");
                            }}
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
        </div>
    )
}

export default App;
