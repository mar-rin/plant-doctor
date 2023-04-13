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
import '../plantDoctor.css'


export default function Water() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Choose plant:</DialogTitle>
                <DialogContent>
                    <CheckboxLabels/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
