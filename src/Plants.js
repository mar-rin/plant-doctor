import React, {useState} from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

function Plants(props){
    const [open,setOpen] = useState(false)
    const [pickedPlant,setPickedPlant] = useState({})

    function openPlantDialog(plant) {
        setOpen(true)
        setPickedPlant(plant)
    }

    function handleClose() {
        setOpen(false)
    }

    return(
        <div>
           <Box  sx={{m: 2, mt:1}} display='flex' flexDirection='row' justifyContent='right'>
                <Button  startIcon={<AddIcon />}
                         variant="contained"
                         sx={{ mt: 3, mb: 2 }}
                         style={{
                         backgroundColor:"#4f6059"}}>
                    Add Plant
                </Button>
           </Box>
           <Grid container spacing={3}>
               <>
                   {(props.plants)
                       ? <div>
                           {props.plants.map((plant,index) =>
                               (<>
                                       <Grid item xs={12} md={6} lg={3} key={index}>
                                           <Paper  elevation={5} sx={{p: '10px'}} onClick={() => openPlantDialog(plant)}>
                                               <Button startIcon={<DeleteIcon/>}
                                                       variant="contained"
                                                       sx={{ mt: 3, mb: 2 }}
                                                       style={{
                                                           backgroundColor:"#4f6059"}}>
                                               </Button>
                                               <Typography variant='h4'>{plant.name}</Typography>
                                               <Typography variant='body'>{plant.description}</Typography>
                                               <Box sx={{mt:3, height: '50%'}}>
                                                   <img src={plant.imagepath} height='100%' />
                                               </Box>
                                               <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                                                   <Box sx={{mt:1}}>
                                                       <Typography variant='body'>Date of purchase:</Typography>
                                                   </Box>
                                                   <Box sx={{mt:1}}>
                                                       {/*<Typography variant='body'>{moment.unix(plant.date_of_purchase.seconds).format('DD.MM.YYYY') }</Typography>*/}
                                                   </Box>
                                               </Box>
                                               <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                                                   <Box sx={{mt:1}}>
                                                       <Typography variant='body'>Fetrilizing:</Typography>
                                                   </Box>
                                                   <Box sx={{mt:1}}>
                                                      {/* <Typography variant='body'>{moment.unix(plant.fertilizing.seconds).format('DD.MM.YYYY') }</Typography>*/}
                                                   </Box>
                                               </Box>
                                               <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                                                   <Box sx={{mt:1}}>
                                                       <Typography variant='body'>Repot:</Typography>
                                                   </Box>
                                                   <Box sx={{mt:1}}>
                                                   {/*    <Typography variant='body'>{moment.unix(plant.repot.seconds).format('DD.MM.YYYY') }</Typography>*/}
                                                   </Box>
                                               </Box>
                                               <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                                                   <Box sx={{mt:1}}>
                                                       <Typography variant='body'>Watering:</Typography>
                                                   </Box>
                                                   <Box sx={{mt:1}}>
                                           {/*            <Typography variant='body'>{moment.unix(plant.watering.seconds).format('DD.MM.YYYY') }</Typography>*/}
                                                   </Box>
                                               </Box>
                                           </Paper>
                                           <Dialog
                                               onClose={handleClose}
                                               aria-labelledby="customized-dialog-title"
                                               open={open}
                                           >
                                               <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                                   {pickedPlant.name}
                                               </DialogTitle>
                                               <DialogContent dividers>
                                                   <Typography gutterBottom>
                                                       {pickedPlant.description}
                                                   </Typography>
                                                   <img src={pickedPlant.imagepath} height='100%' />
                                               </DialogContent>
                                               <DialogActions>
                                               </DialogActions>
                                           </Dialog>
                                       </Grid>
                               </>
                           ))}
                       </div>
                       : <h1>Please add some plants!</h1>
                   }
               </>

           </Grid>
        </div>)
}
export default Plants;

{/*
<>
    {(props.plants)
        ? <div>
            {props.plants.map((plant,index) =>
                (<>
                        <Grid item xs={12} md={6} lg={3} key={index}>
                            <Paper  elevation={5} sx={{p: '10px'}} onClick={() => openPlantDialog(plant)}>
                                <Button startIcon={<DeleteIcon/>}
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        style={{
                                            backgroundColor:"#4f6059"}}>
                                </Button>
                                <Typography variant='h4'>{plant.name}</Typography>
                                <Typography variant='body'>{plant.description}</Typography>
                                <Box sx={{mt:3, height: '50%'}}>
                                    <img src={plant.imagepath} height='100%' />
                                </Box>
                                <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                                    <Box sx={{mt:1}}>
                                        <Typography variant='body'>Date of purchase:</Typography>
                                    </Box>
                                    <Box sx={{mt:1}}>
                                        <Typography variant='body'>{moment.unix(plant.date_of_purchase.seconds).format('DD.MM.YYYY') }</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                                    <Box sx={{mt:1}}>
                                        <Typography variant='body'>Fetrilizing:</Typography>
                                    </Box>
                                    <Box sx={{mt:1}}>
                                        <Typography variant='body'>{moment.unix(plant.fertilizing.seconds).format('DD.MM.YYYY') }</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                                    <Box sx={{mt:1}}>
                                        <Typography variant='body'>Repot:</Typography>
                                    </Box>
                                    <Box sx={{mt:1}}>
                                        <Typography variant='body'>{moment.unix(plant.repot.seconds).format('DD.MM.YYYY') }</Typography>
                                    </Box>
                                </Box>
                                <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                                    <Box sx={{mt:1}}>
                                        <Typography variant='body'>Watering:</Typography>
                                    </Box>
                                    <Box sx={{mt:1}}>
                                        <Typography variant='body'>{moment.unix(plant.watering.seconds).format('DD.MM.YYYY') }</Typography>
                                    </Box>
                                </Box>
                            </Paper>
                            <Dialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={open}
                            >
                                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                    {pickedPlant.name}
                                </DialogTitle>
                                <DialogContent dividers>
                                    <Typography gutterBottom>
                                        {pickedPlant.description}
                                    </Typography>
                                    <img src={pickedPlant.imagepath} height='100%' />
                                </DialogContent>
                                <DialogActions>
                                </DialogActions>
                            </Dialog>
                        </Grid>

                    </>
                ))}

            : <h1>Please add some plants!</h1>}
        </>
*/}
