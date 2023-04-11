import React from "react";
import { useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function Navbar(){

    const navigate = useNavigate();

    return(
        <div className="menu-bar" id="navBar">
            <Grid container alignItems="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={1}>
                        <Button className="menu-button"
                            onClick={()=>{navigate("/")}}
                            /*min-width="200px"*/
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{
                                backgroundColor:"#4f6059",
                                width: "200px"
                            }}>
                            Home
                        </Button>
                    </Grid>
                <Grid item xs={1}>
                    <Button className="menu-button"
                            onClick={()=>{navigate("/my-plants")}}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{
                                backgroundColor:"#4f6059",
                                width: "200px"
                            }}>
                        My Plants
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button className="menu-button"
                            onClick={()=>{navigate("/shop")}}
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{
                                backgroundColor:"#4f6059",
                                width: "200px"
                            }}>
                        Shop
                    </Button>
                </Grid>
                {/*<Grid item xs={3}>
                    <Button className="menu-button"
                            onClick={()=>{navigate("/account")}}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{
                                backgroundColor:"#4f6059"
                            }}>
                        Account
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button className="menu-button"
                            onClick={()=>{navigate("/login")}}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{
                                backgroundColor:"#4f6059"
                            }}>
                        LogIn/SignUp
                    </Button>
                </Grid>*/}
            </Grid>
        </div>
    )
}