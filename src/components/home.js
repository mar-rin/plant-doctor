import CalendarMain from "./calendarMain";
import AddEvent from "./addEvent";
import React from "react";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


export default function Home( props ) {

    function ShowDialog() {
        return (
            <>
                <Dialog
                    onClose={props.handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={props.open}
                >
                    <DialogTitle id="customized-dialog-title" onClose={()=>console.log("Closed dialogue")}>
                        {(props.foundWater.length===0 && props.foundFert.length===0 && props.foundPot.length===0)
                        ? <h1>No duty calls! Enjoy your day! 😊 </h1>
                        : <h1>THINGS TO DO</h1>}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            {(props.foundWater.length>0) &&
                                (<div>
                                        <h2>💧 Water those plants: </h2>
                                        {props.foundWater.map((item) => (
                                            <h4>{item}</h4>))}
                                </div>)
                            }
                            {(props.foundPot.length>0) &&
                                (<div>
                                    <h2>🌱 Repot those plants: </h2>
                                    {props.foundPot.map((item) => (
                                        <h4>{item}</h4>))}
                                </div>)
                            }
                            {(props.foundFert.length>0) &&
                                (<div>
                                    <h2>🪴 Fertilize those plants: </h2>
                                    {props.foundFert.map((item) => (
                                        <h4>{item}</h4>))}
                                </div>)
                            }
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            </>
        )
    }



    return(
        <div>
            {(props.activeDate !== "") && <ShowDialog/>}
            {(props.plants.length > 0)
                ? <div>
                    <CalendarMain
                        plants={props.plants}
                        usefulDates={props.usefulDates}
                        pickedDate={props.pickedDate}
                        reallyUsefulDates={props.reallyUsefulDates}

                    />
                    <AddEvent
                        humidity={props.humidity}
                        handleHumidity={props.handleHumidity}
                    />
                </div>
                : <h1> First, head over to the MY PLANTS section and add plants to your collection!</h1>
            }
        </div>
    )
}
