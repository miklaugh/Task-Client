import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// the buttons are mapped to api rquests in App component, except for 'Clear',
// which simply clears the form. 
// the commented extended button-set is for dev version fully functional in production
// version
function TaskButtonPanel({handleTaskButton}){
  //const buttonTexts = ['Add','Update', 'Delete','Batch','Delete-All','Sql-Test','Exit'];
  const buttonTexts = ['Add','Update', 'Delete', 'Clear'];
  return(
    <>
      {buttonTexts.map((txt, index)=>
        <Button key={index}
          style={{marginRight:'1rem'}}
          size='small' 
          variant='outlined'
          onClick={()=>handleTaskButton(txt)}>
          {txt}
        </Button>
      )}
    </>   
  )}

export default TaskButtonPanel;
