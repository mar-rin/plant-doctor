import React, { useRef} from 'react';
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function Account({logOut, user}) {

    return (
        <div>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                width: '1150px',
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
                            width: '300px',
                            height: '500px'
                        }}>
                            <AccountCircleIcon  style={{width: "200px", fontSize: "200px"}} />
                                <h3> First name: {user[0].firstName } </h3>
                                <h3> Last name: {user[0].lastName } </h3>
                                <h3> E-mail: {user[0].email } </h3>
                                <h3> Location: {user[0].location } </h3>
                            <Button className="menu-button"
                                    onClick={logOut}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    style={{
                                        backgroundColor:"#4f6059"
                                    }}>
                                Log Out
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Account
