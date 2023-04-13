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
    const [allPlants,setAllPlants] = useState(props.allPlants)
    console.log(props.allPlants)
    /* const plants = [
    {
    name: 'Monstera',
    description: 'Green plant with red flower',
    imagepath:'https://images.unsplash.com/photo-1625582598943-2445bb7b8253?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
    },
    {
    name: 'Rose',
    description: 'Dark green plant with white flower',
    imagepath:'https://images.unsplash.com/photo-1579092692340-151d14bee377?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
    name: 'Primula',
    description: 'Light green plant with yellow flower',
    imagepath:'https://images.unsplash.com/photo-1650815039316-56b4625f2823?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80'
    }
    ]*/

    function openPlantDialog(plant) {
        setOpen(true)
        setPickedPlant(plant)
    }

    function handleClose() {
        setOpen(false)

    }

    function deletePlant(index){
        setOpen(false)
        allPlants.splice(index, 1)
        console.log(allPlants)
        setAllPlants(allPlants)

    }

    return(
        <div>
            <Typography variant='h2'>Plant collection</Typography>
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
                {allPlants.length > 0 && allPlants.map((plant,index) => (
                    <Grid item xs={12} md={6} lg={3} key={index}>
                        <Paper  elevation={5} sx={{p: '10px'}} onClick={() => openPlantDialog(plant)}>
                            <Box  sx={{p:1}} display='flex' flexDirection='row' justifyContent='right'>
                                <Button startIcon={<DeleteIcon/>}
                                    variant="contained"
                                        onClick={() => deletePlant(index)}
                                    style={{
                                        backgroundColor:"#4f6059", zIndex: 99999}}
                                    sx={{zIndex: 99999}}
                                >
                                </Button>
                            </Box>
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
                    </Grid>
                ))}
            </Grid>
            <Dialog

                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {pickedPlant.name}
                </DialogTitle>
                <img src={pickedPlant.imagepath} height='100%' />
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {pickedPlant.description}
                    </Typography>

                    <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                        <Box sx={{mt:1}}>
                            <Typography variant='body'>Date of purchase:</Typography>
                        </Box>
                        <Box sx={{mt:1}}>
                            {/*<Typography variant='body'>{moment.unix(pickedPlant.date_of_purchase.seconds).format('DD.MM.YYYY') }</Typography>*/}
                        </Box>
                    </Box>
                    <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                        <Box sx={{mt:1}}>
                            <Typography variant='body'>Fetrilizing:</Typography>
                        </Box>
                        <Box sx={{mt:1}}>
                            {/*<Typography variant='body'>{moment.unix(pickedPlant.fertilizing.seconds).format('DD.MM.YYYY') }</Typography>*/}
                        </Box>
                    </Box>
                    <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                        <Box sx={{mt:1}}>
                            <Typography variant='body'>Repot:</Typography>
                        </Box>
                        <Box sx={{mt:1}}>
                            {/*<Typography variant='body'>{moment.unix(pickedPlant.repot.seconds).format('DD.MM.YYYY') }</Typography>*/}
                        </Box>
                    </Box>
                    <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                        <Box sx={{mt:1}}>
                            <Typography variant='body'>Watering:</Typography>
                        </Box>
                        <Box sx={{mt:1}}>
                            {/*<Typography variant='body'>{moment.unix(pickedPlant.watering.seconds).format('DD.MM.YYYY') }</Typography>*/}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    {/*  <Button autoFocus onClick={handleClose}>
Save changes
</Button>*/}
                </DialogActions>
            </Dialog>
            {/* <Paper elevation={5}>
{plants[0].name} <br/>
{plants[0].description}
<img src={plants[0].imagepath} />
</Paper>
<Paper elevation={5}>
{plants[1].name} <br/>
{plants[1].description}
<img src={plants[0].imagepath} />
</Paper>
<Paper elevation={5}>
{plants[2].name} <br/>
{plants[2].description}
<img src={plants[0].imagepath} />
</Paper>*/}


        </div>
    )
}

export default Plants;