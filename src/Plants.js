import React from "react";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

function Plants(){

    const plants = [
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
    ]

    function aleksei(name) {
        alert(name)

    }


    return(
        <div>
            <h1><Typography variant='h2'>THIS IS PLANT PAGE</Typography></h1>

    <Grid container spacing={3}>
            {plants.map((alexei,index) => (
                <Grid item xs={12} md={6} lg={2}>
                    <Paper key={index} elevation={5} sx={{p: '10px', height: '25vh'}} onClick={() => aleksei(alexei.name)}>
                       <Typography variant='h4'>{alexei.name}</Typography>
                        <Typography variant='body'>{alexei.description}</Typography>
                        <Box sx={{height: '50%'}}>
                          <a href={alexei.imagepath} target="_blank"><img src={alexei.imagepath} height='100%' /></a>
                        </Box>
                    </Paper>
                </Grid>
            ))}
    </Grid>
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
