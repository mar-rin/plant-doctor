import CalendarMain from "./calendarMain";
import AddEvent from "./addEvent";
import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


export default function Home({ plants, usefulDates, dutiesByPlant, pickedDate, activeDate, open, close, handleClose }){

    /*function findDuties(){
        if(activeDate){
            console.log("Active Date: " + activeDate);
            console.log("dutiesByPlant from H: " + dutiesByPlant);

    /!*        const found = dutiesByPlant.filter((item)=> (item.activites.watering===activeDate))
            console.log("Found watering: " + found.length);*!/

        }
        else {
            console.log("No active date present!")
        }
    }

    findDuties()*/

    function ShowDialog() {
        return (
            <>
                <Dialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTitle id="customized-dialog-title" onClose={()=>console.log("Closed dialogue")}>
                        <h1>These are the things you need to do: </h1>
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            <h2>Some text</h2>
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
            {(activeDate !== "") && <ShowDialog/>}
            {(plants.length > 0)
                ? <div>
                    <CalendarMain
                        plants={plants}
                        usefulDates={usefulDates}
                        pickedDate={pickedDate}
                    />
                    <AddEvent/>
                </div>
                : <h1> First, head over to the MY PLANTS section and add plants to your collection!</h1>
            }
        </div>
    )
}
