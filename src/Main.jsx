import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 100,
    width: '20rem',
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Main({taskButtonPanel,tskForm,taskListSelect}){
  const classes = useStyles();
  return(
    
   <div style={{marginTop:'5rem'}} className={classes.root}>
      
      <Grid container  direction='column' alignContent='center'justifyContent='center'  spacing={4} >
          <Grid container item justifyContent='center' spacing={4}>
              <Grid item style={{backgroundColor:'white'}}>
                {tskForm}
              </Grid>
          </Grid>
          <Grid container item justifyContent='center' spacing={4}>
              <Grid item style={{backgroundColor:'white'}}>
                {taskButtonPanel}
              </Grid>
          </Grid>
          <Grid container item justifyContent='center' spacing={4}>
              <Grid item style={{backgroundColor:'white'}}>
                {taskListSelect}
              </Grid>
          </Grid>

         
         
      </Grid>{/*main container*/}
    </div>
  );
}

export default Main;