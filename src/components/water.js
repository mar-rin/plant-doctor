import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CheckboxLabels from './checkbox';
import {faDroplet} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import '../plantDoctor.css'


export default function Water({humidity, handleHumidity }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const marks = [
        {
            value: 0,
            label: 'very dry',
        },
        {
            value: 25,
            label: 'dry',
        },
        {
            value: 50,
            label: 'normal',
        },
        {
            value: 75,
            label: 'humid',
        },
        {
            value: 100,
            label: 'very humid',
        },
    ];

    function valuetext(value) {
        return `${value}°C`;
    }

    function valueLabelFormat(value) {
        return marks.findIndex((mark) => mark.value === value) + 1;
    }

    return (
        <div className="menu-bar" id="event">
            <Grid container spacing={1} direction="column" alignItems="center" justifyContent="center">
                <Grid item xs={3}>
                    <FontAwesomeIcon
                        onClick={()=>{handleClickOpen()}}
                        icon= {faDroplet}
                        size={20}
                        style={{color:"#1d8289"}}
                        cursor="pointer"
                    />
                </Grid>
            </Grid>
            <Dialog open={open} onClose={handleClose} className="humidity-meter" >
                <DialogTitle>Choose the humidity level of your apartment / house:</DialogTitle>
                <DialogContent >

                    <Box sx={{ width: 400 }} >
                        <Slider
                            className="humidity-meter"
                            aria-label="Restricted values"
                            defaultValue={humidity}
                            valueLabelFormat={valueLabelFormat}
                            getAriaValueText={valuetext}
                            step={null}
                            valueLabelDisplay="auto"
                            marks={marks}
                            onChange={handleHumidity}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
