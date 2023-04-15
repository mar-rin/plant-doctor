import React from "react";
import { useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import transparentLogo from "../images/transparentLogo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar({ activeUser }){

    const navigate = useNavigate();

    return(
            <div className="menu-bar" id="navBar">
                <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">
                    <Grid item xs={2}>
                        <img src={transparentLogo} alt="Logo" className="mainLogo" onClick={()=>navigate("/")}
                             style={{
                                 cursor: 'pointer',
                                 width: '100%',
                                 height: '100%',
                                 objectFit: 'contain',
                                 marginTop: '20px'
                             }}/>
                    </Grid>
                    <Grid item xs={2}>
                            <Button className="menu-button"
                                onClick={()=>{navigate("/")}}
                                /*min-width="200px"*/
                                variant="contained"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                                style={{
                                    backgroundColor:"#4f6059"
                                }}>
                                Calendar
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
                    <Grid item xs={2}>
                        <div className="head-bar">
                            <div className="profile-box" onClick={()=>{navigate("/account")}}
                            style={{
                                marginLeft: '20px',
                                }}>
                                < AccountCircleIcon  style={{width: "80px", fontSize: "80px"}} />
                                <h3>Hello, {activeUser[0].firstName }! </h3>
                            </div>
                        </div>
                    </Grid>
            </Grid>
        </div>
    )
}