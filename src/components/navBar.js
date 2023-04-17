import React, { useState, useRef, useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import fullLogo from "../images/transparentLogo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from "@mui/material/Paper";


export default function Navbar({ activeUser, sessionUserPlants, logOut }){

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
            <div className="logo-box start">
                <img src={fullLogo} alt="Logo" className="" onClick={()=>navigate("/")}
                     style={{
                         cursor: 'pointer',
                         width: '100%',
                         height: '100%',
                         objectFit: 'contain',
                         marginTop: '0px'
                     }}/>
            </div>
            <div className="buttone-box center" id="navBar">
                <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
                    <Grid item xs={3}>
                        <Button className="menu-button"
                                onClick={()=>{navigate("/")}}
                                variant="contained"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                style={{backgroundColor:"#4f6059",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",}}>
                            Home
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button className="menu-button"
                                onClick={()=>{navigate("/my-plants")}}
                                variant="contained"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    backgroundColor:"#4f6059",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
                                }}>
                            My Plants
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button className=""
                                onClick={()=>{navigate("/shop")}}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    backgroundColor:"#4f6059",
                                    paddingTop: "10px",
                                    paddingBottom: "10px",
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
            {isDrawerOpen &&
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

                    <div>
                        {(activeUser) &&
                        <div style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            width: '500px',
                            height: '700px',
                            margin: 'auto',
                        }}>
                            <h1 style={{ fontSize: "3rem" }}>My account</h1>
                            <Grid container spacing={1} direction="column" alignItems="center" justifyContent="center">
                                <Grid item xs={2}>
                                    <Paper elevation={5} style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        padding: '30px',
                                        width: '400px',
                                        height: '660px'
                                    }}>
                                        <AccountCircleIcon  style={{width: "200px", fontSize: "200px"}} />
                                        <h1>{activeUser[0].username}'s Profile</h1>
                                        <h3>Last Name: {activeUser[0].lastName}    <button>Change</button></h3>
                                        <h3>Email: {activeUser[0].email}    <button>Change</button></h3>
                                        <h3>Password: {activeUser[0].password}    <button>Change</button></h3>
                                        <h3>Username: {activeUser[0].username}    <button>Change</button></h3>
                                        {(sessionUserPlants) &&
                                            <h3>Number of Plants: {sessionUserPlants.length}    </h3>}
                                        <Button className="menu-button"
                                                onClick={logOut}
                                                fullWidth
                                                variant="contained"
                                                sx={{ mt: 3, mb: 2 }}
                                                style={{
                                                    backgroundColor:"#4F6059"
                                                }}>
                                            Log Out
                                        </Button>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </div>}
                    </div>
                </div>
            }
        </div>
        </>
    )
}