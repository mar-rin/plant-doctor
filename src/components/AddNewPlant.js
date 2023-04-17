import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AddIcon from "@mui/icons-material/Add";



export default function AddNewPlant() {

        const [open, setOpen] = React.useState(false);

        const handleClickOpen = () => {
             setOpen(true);
         };

         const handleClose = () => {
             setOpen(false);
         };

    return (
        <div>

            <Button  onClick={handleClickOpen}
                    startIcon={<AddIcon />}
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                     style={{
                         backgroundColor:"#4f6059"}}>
                Add Plant
            </Button>

            <Dialog  open={open} onClose={handleClose}>
                <DialogTitle>Add new Plant</DialogTitle>
                <DialogContent>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 1, width: '25ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Name" variant="outlined"/>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 1, width: '25ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Description" variant="outlined"/>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 1, width: '25ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Image" variant="outlined"/>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': {m: 1, width: '25ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Date of purchase" variant="outlined"/>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


function FormDialog() {
    //const [open, setOpen] = React.useState(false);

   /*const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };*/
}