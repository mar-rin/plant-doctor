import React from "react";
import Water from "./water";
import Fertilize from "./fertilize";
import Repot from "./repot";
import '../plantDoctor.css'
import Paper from "@mui/material/Paper";

export default function AddEvent(){
    return(
        <div className="menu-bar" id="addEvent">
            <Paper elevation={5} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '30px',
            }}>
                <p style={{
                    textAlign: 'center',
                    fontSize: '24px'
                }}>Did you
                    <span style={{ color: '#1d8289', fontWeight: 'bold' }}> water</span>,
                    <span style={{ color: '#582d2a', fontWeight: 'bold' }}> fertilize</span> or
                    <span style={{ color: '#63963c', fontWeight: 'bold' }}> repot</span> some plants today?</p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Water/>
                    <Fertilize/>
                    <Repot/>
                </div>
            </Paper>
        </div>
    )
}
