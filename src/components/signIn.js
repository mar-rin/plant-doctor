import '../plantDoctor.css';
import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import fullLogo from '../images/fullLogo.png';



function SignIn({ handleLogIn }) {


    return (
            <Container component="main" maxWidth="xs">
                <img src={fullLogo} alt="Logo" className="logo-login"/>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Box component="form" onSubmit={handleLogIn} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
{/*                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />*/}
                        <Button
                            sx={{ mt: 2 }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{
                                backgroundColor:"#4f6059"
                            }}
                        >
                            Log In
                        </Button>
                    </Box>
                </Box>
            </Container>
    );
}
export default SignIn
