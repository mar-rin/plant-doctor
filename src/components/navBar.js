import React from "react";
import { useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import transparentLogo from "../images/transparentLogo.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar({ activeUser }){

    const navigate = useNavigate();

    return(
        <header>
            <div className="head-bar">
                <img src={transparentLogo} alt="Logo" className="mainLogo" onClick={()=>navigate("/")}
                     style={{
                         cursor: 'pointer',
                         width: '300px',
                         height: 'auto'
                     }}/>
                <div className="profile-box" onClick={()=>{navigate("/account")}}>
                    < AccountCircleIcon  style={{width: "60px", fontSize: "50px"}} />
                    <h3>Hello, {activeUser[0].firstName }! </h3>
                </div>
            </div>
            <div className="menu-bar" id="navBar">
                <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center">
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
    </header>
    )
}