import React, {useEffect, useState} from "react";
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
import addNewPlant from "./components/AddNewPlant";
import AddNewPlant from "./components/AddNewPlant";
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';

function Plants(props){

    const [open,setOpen] = useState(false)
    const [pickedPlant,setPickedPlant] = useState(props.plants[0])
    const [allPlants, setAllPlants] = useState(props.plants);
    const [addNewPlants,setAddNewPlants] = useState({})

    // useEffect(() => {
    //    setAllPlants(props.allPlants)
    // },[])

    function openPlantDialog(plant) {
        setOpen(true)
        setPickedPlant(plant)
    }
    /*function addNewPlant(plant) {
        setOpen(true)
        setPickedPlant(plant)
    }*/

    function handleClose() {
        setOpen(false)

    }


    function deletePlant(index){

        if (window.confirm("Do you really want to delete this plant?") == true) {
            const newArray = [...allPlants]; // Step 3: Create a copy of the current state array
            newArray.splice(index, 1); // Step 4: Remove the element from the new array
            setAllPlants(newArray); // Step 5: Update the state with the new array
        } else {

        }


    }


    function resetAllPlants(){
        const newArray = [...props.plants]; // Step 3: Create a copy of the current state array
        setAllPlants(newArray); // Step 5: Update the state with the new array

    }

    // console.log(allPlants, "outer")


    return(
        <Box sx={{width: '100%'}}>
            <Typography variant='h2'>Plant collection</Typography>
            <Box  sx={{m: 2, mt:1}} display='flex' flexDirection='row' justifyContent='right'>
                <AddNewPlant/>
            </Box>
            <Grid container spacing={3} sx={{width:'95%', ml:'auto', mr:'auto'}} >
                {allPlants.length > 0 && allPlants.map((plant,index) => (
                    <Grid item xs={12} md={6} lg={3} key={index}>
                        <Paper  elevation={5} sx={{p:'10px'}} >
                            {/*<Paper  elevation={5} sx={{p:'10px'}} onClick={() => openPlantDialog(plant)}>*/}
                            <Box  sx={{p:1}} display='flex' flexDirection='row' justifyContent='right'>
                                <Button startIcon={<LocalFloristIcon/>}
                                        variant="contained"
                                        onClick={() => openPlantDialog(plant)}
                                        style={{
                                            backgroundColor:"#4f6059"}}
                                        sx={{p:1, m:1}}
                                >
                                </Button>
                                <Button startIcon={<DeleteIcon/>}
                                        variant="contained"
                                        onClick={() => deletePlant(index)}
                                        style={{
                                            backgroundColor:"#4f6059"}}
                                        sx={{p:1, m:1}}
                                >
                                </Button>

                            </Box>
                            <Typography variant='h4'>{plant.name}</Typography>
                            {/* <Typography variant='body'>{plant.description}</Typography>*/}
                            <Box sx={{mt:3, height: '50%'}}>
                                <img src={plant.imagepath} height='100%' />
                            </Box>
                            {/* <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
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
                            </Box>*/}
                        </Paper>

                    </Grid>
                ))}



            </Grid>

            <Button
                variant="outlined"
                onClick={() => resetAllPlants()}
                sx={{p:1, m:1}}
            />

            <Dialog
                fullWidth
                maxWidth='xs'
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {pickedPlant.name}
                </DialogTitle>
                <Box display='flex' flexDirection='row' justifyContent='center'>
                    <img src={pickedPlant.imagepath} height='100%' />
                </Box>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {pickedPlant.description}
                    </Typography>

                    <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                        <Box sx={{mt:1}}>
                            <Typography variant='body'>Date of purchase:</Typography>
                        </Box>
                        <Box sx={{mt:1}}>
                            <Typography variant='body'>{moment.unix(pickedPlant.date_of_purchase['seconds']).format('DD.MM.YYYY') }</Typography>
                        </Box>
                    </Box>
                    <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                        <Box sx={{mt:1}}>
                            <Typography variant='body'>Fetrilizing:</Typography>
                        </Box>
                        <Box sx={{mt:1}}>
                            <Typography variant='body'>{moment.unix(pickedPlant.fertilizing['seconds']).format('DD.MM.YYYY') }</Typography>
                        </Box>
                    </Box>
                    <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                        <Box sx={{mt:1}}>
                            <Typography variant='body'>Repot:</Typography>
                        </Box>
                        <Box sx={{mt:1}}>
                            <Typography variant='body'>{moment.unix(pickedPlant.repot['seconds']).format('DD.MM.YYYY') }</Typography>
                        </Box>
                    </Box>
                    <Box sx={{mt:1}} display='flex' flexDirection='row' justifyContent='space-between'>
                        <Box sx={{mt:1}}>
                            <Typography variant='body'>Watering:</Typography>
                        </Box>
                        <Box sx={{mt:1}}>
                            <Typography variant='body'>{moment.unix(pickedPlant.watering['seconds']).format('DD.MM.YYYY') }</Typography>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>


        </Box>
    )
}

export default Plants;