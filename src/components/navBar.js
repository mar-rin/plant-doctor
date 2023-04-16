import React, { useState, useRef, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import fullLogo from "../images/transparentLogo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar({ activeUser, sessionUserPlants }){

    const navigate = useNavigate();


    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const drawerRef = useRef(null);

    function handleImageClick()  {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleClickOutside = (event) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target)) {
            setIsDrawerOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return(
        <>
        <header>
            <div className="logo-icon start">
                <img src={fullLogo} alt="Logo" className="mainLogo" onClick={()=>navigate("/")} />
            </div>
            <div className="center" id="navBar">
                <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
                    <Grid item xs={2}>
                        <Button className="menu-button"
                                onClick={()=>{navigate("/")}}
                                variant="contained"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                style={{backgroundColor:"#4f6059"}}>
                            Home
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className="menu-button"
                                onClick={()=>{navigate("/my-plants")}}
                                variant="contained"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    backgroundColor:"#4f6059"
                                }}>
                            My Plants
                        </Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className="menu-button"
                                onClick={()=>{navigate("/shop")}}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    backgroundColor:"#4f6059"
                                }}>
                            Shop
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <div className="account-icon end"
                 onClick={handleImageClick}>
                < AccountCircleIcon  style={{width: "60px", fontSize: "50px"}} />
                <h3>Hello, {activeUser[0].username }! </h3>
            </div>
        </header>

        <div>
            {isDrawerOpen && (
                <div
                    ref={drawerRef}
                    style={{
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        height: '100%',
                        width: '30%',
                        backgroundColor: 'white',
                        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
                        padding: '20px',
                        boxSizing: 'border-box',
                    }}
                >
                    <>
                        {(activeUser) &&
                             <>
                                 <h1>{activeUser[0].username}'s Profile</h1>
                                 <br></br>
                                 <div>
                                     <h3>First Name: {activeUser[0].firstName}    <button>Change</button></h3>
                                     <h3>Last Name: {activeUser[0].lastName}    <button>Change</button></h3>
                                     <h3>Email: {activeUser[0].email}    <button>Change</button></h3>
                                     <h3>Passwor: {activeUser[0].password}    <button>Change</button></h3>
                                     <h3>Username: {activeUser[0].username}    <button>Change</button></h3>
                                     <hr className="dashed"></hr>
                                     {(sessionUserPlants) &&
                                     <h3>Number of Plants: {sessionUserPlants.length}    </h3>}
                                 </div>

                            </>
                          }
                    </>

                </div>
            )}
        </div>
        </>
    )
}