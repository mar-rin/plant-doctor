import React, {useEffect, useRef, useState} from "react";
import Water from "./water";
import Fertilize from "./fertilize";
import Repot from "./repot";
import '../plantDoctor.css'
import Paper from "@mui/material/Paper";


export default function AddEvent({humidity, handleHumidity}){

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
                }}>Adjust the
                    <span style={{ color: '#1d8289', fontWeight: 'bold' }}> watering</span>,
                    <span style={{ color: '#582d2a', fontWeight: 'bold' }}> fertilizing</span> or
                    <span style={{ color: '#63963c', fontWeight: 'bold' }}> repotting</span> schedule from here</p>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Water
                        humidity={humidity}
                        handleHumidity={handleHumidity}
                    />
                    <Fertilize/>
                    <Repot/>
                </div>
            </Paper>
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

                            <>
                                <h1>Humidity Meter</h1>
                                <br></br>
                                <div>

                                </div>

                            </>

                        </>

                    </div>
                )}
            </div>
        </div>

    )
}
