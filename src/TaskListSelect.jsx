
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText} from '@material-ui/core';
 

const useStyles = makeStyles((theme) => ({
  // not used - use inline styles from now on
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TaskListSelect({tasks,selectIx, handleTaskListSelect}){

    const classes = useStyles();
   // className={classes.root}
   console.log('@ TakListSelect...SelectIx:', selectIx);
    return (
      <div >
        <List dense={true} component="ul" 
          style={{margin:'auto',overflow:'auto',width:'30em', height:'8em',
          borderStyle:'solid',borderWidth:'thin'}}
        >
          {tasks.map((item, index) =>
            
            <ListItem button component={'li'} key={index}
            
            onClick={()=>handleTaskListSelect(index)}
            >
            <ListItemText style = {{color: (index===selectIx.selectIx) ? 'green':'inherit'}} primary={`${item.task} ${item.now}`}/>
           
          </ListItem>)}
        </List>
      </div>
  )
}

export default TaskListSelect;