import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  formButton: {
    margin:theme.spacing(0),
    marginTop:theme.spacing(4),
    borderRadius:0
  },
  textField: {
    marginRight:theme.spacing(1),
    width:'8ch',
  },
  helperText: {
    color:'red',
    width:'8em'
  }
}));
/*
Odd thing with dates. I need to format the date in dayjs() with 'YYYY-MM-DD' when 
creating a variable to be used as the defaultValue to a TextField date type, otherwise the
defaultValue becomes a literal 'dd-mm-yyyy'. The irony is that the TextField component
uses localization to convert from yyyy-mm-dd to dd-mm-yyyy. WTF!!!

*/
function TaskForm({form, handleTaskForm}){
  //const buttonTexts = ['Add','Update', 'Delete','Batch','Delete-All','Sql-Test','Exit'];
  //handleTaskButton
  return(
    <>
      
      <form noValidate autoComplete="off" onSubmit={e=>e.preventDefault()}> 
        <label 
          style={{backgroundColor:'#B2D8D8',
                  padding:'0.5rem',color:'grey',
                fontWeight:'normal'}}
        > Task Tracker App</label>     
        <br/><br/><br/>
        <TextField  
          autoFocus ={true}
          type='text'
          style= {{marginRight:'1em'}}
          label="Task" 
          variant="filled"
          size='small'
          name="task"
          value = {form.task}
          onChange={handleTaskForm}
          InputLabelProps={{ shrink: true }}
          inputProps={{ spellCheck: 'false',maxLength:50,size:30 }}
        />

        <TextField
              variant="filled"
              size='small'
              id="date"
              label="Due"
              type="date"
              name='now'
              value={form.now}
              onChange={handleTaskForm}
              InputLabelProps={{
                shrink: true
              }}
            />
        </form> 
        {/* button panel */}
        {/*taskButtonPanel*/}
    </>
    
  )
}

export default TaskForm