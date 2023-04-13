
import React from "react";
import CalendarMain from "./calendarMain";
import AddEvent from "./addEvent";
import Grid from "@mui/material/Grid";

export default function Home(){
    return(
        <div>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                width: '1150px',
                height: '700px',
                margin: 'auto',
            }}>
                <Grid container spacing={1} direction="column" alignItems="center" justifyContent="center">
                    <Grid item xs={2}>
                        <AddEvent/>
                        <div style={{marginTop: '30px'}}>
                            <CalendarMain />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}