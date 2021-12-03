// remove useEffect
import {useState, useEffect} from 'react';
import './App.css';
import TaskForm from './TaskForm';
import TaskButtonPanel from './TaskButtonPanel';
import TaskListSelect from './TaskListSelect';
import Main from './Main';
import statusEnums from './statusEnums';

import {baseURL, addToDo,deleteId,updateId,useAutoFetch ,addAll, deleteByIds,sqlTest} from './apiRequests';
import moment from 'moment';

function App() {
 

  const initTaskForm=()=>({id:null,stat:statusEnums.NEW, selectIx:null,
      task:'',now: (moment().format('YYYY-MM-DD'))});
  const [taskForm, setTaskForm]=useState(initTaskForm({}));

  const initTaskList =()=> [];
  const [taskList, setTaskList] = useState(initTaskList([]));
  
  // test obj for addToDo
  const props={ setTaskList,taskList,setTaskForm,initTaskForm};
  //const baseURL='http://localhost:5000/api';List

  const url = `${baseURL}/mytodos/list`;
 
// custom hook to make inital API request to load the DB into tasklist state
  useAutoFetch(url,setTaskList); // ignore when testing layout
/*
  let d1 = moment().format('YYYY/MM/DD');
  let d2 = moment(d1).format('DD/MM/YYYY');
  let d3 = moment(d2,'DD/MM/YYYY').format('YYYY/MM/DD');
  console.log('d1 d2:',d1,d2);
  
  console.log('d3:',d3);
  */
  // handle TaskForm buttons
  // btnLabel: string:  button text name
   function handleTaskButton(btnLabel) {
    console.log('>>>:', btnLabel);
    switch (btnLabel) {
      case 'Add':
        // assign only api-relevant data from task form
        //let newToDo={task:taskForm.task,now:taskForm.now}
        addToDo(taskForm,taskList,setTaskList,setTaskForm,initTaskForm);
        //setTaskList([{ ...taskForm }, ...taskList]);
        //setTaskForm(initTaskForm());
        break;
      case 'Update':
        console.log('Update taskForm ID:',taskForm.id);
        updateId(taskForm,taskList,setTaskList,setTaskForm,initTaskForm);
        //setTaskForm(initTaskForm());
        //setTaskList(initTaskList());
        break;
      case 'Delete':
        console.log('Delete taskForm',taskForm);
        deleteId(taskForm.id,taskList,setTaskList,setTaskForm,initTaskForm);
        break;
        case 'Clear':
          setTaskForm(initTaskForm());
          break;

      case 'Batch':
        
       
        // these are not yet used
        let amendItems = taskList.filter(i => i.stat === statusEnums.UPDATE );
        console.log('Amend Items:',amendItems);
        let virginItems = taskList.filter(i => i.stat === statusEnums.VIRGIN);
        console.log('Virgin Items:',virginItems);
        // create a new items from task list
        let newItems = taskList.filter(i => i.stat === statusEnums.NEW );
        console.log('New Items:',newItems);
        //create newToDoPosts <- newItems with stat & stripped-off
        //and insert current ISO date
        const newToDoPosts = newItems.map(i=>({task:i.task,
          now:moment().format('YYYY-MM-DD')}));
        console.log('Stripped newToDoPosts',newToDoPosts);
        addAll(newToDoPosts);
        break;
        case 'Delete-All':
          console.log('Delete-All hit!');
          ///let deleteItems = taskList.filter(i => i.stat === statusEnums.DELETE );
          let ids=[11,12,13];
          console.log('Delete Items:',ids);
          deleteByIds(ids);
          break;
      case 'Sql-Test':
          sqlTest();
      case 'Exit':
        // code block
        break;
      default: console.log(`No match for ${btnLabel}`)
      // code block
    }
  }
  // update taskList with added taskForm
  const handleClickAddTask=(task)=>{
    console.log('Added',task);
    setTaskList([{...task}, ...taskList]);
  }
  // update taskForm keyboard input 
  const handleTaskForm = e => {
    const { name,value } = e.target;
    setTaskForm( prev=>({...prev, [name]:value}));
  }

  // insert selected taskList element into taskForm 
  const handleTaskListSelect = (ix)=>{
    console.log('Selected task:',taskList[ix]);
    // clone taskList element
    let tForm = {...taskList[ix]};
    // convert from UK date format to iso format - required by 'calendar' component
    // and SQL
    // (note, the 'calendar' auto coverts to UK via browser's localiztion, but
    // does not accept raw UK format directly)
    let dd=tForm.now;
    tForm.now = moment(dd,'DD-MM-YYYY').format('YYYY-MM-DD');
    tForm.selectIx = ix;
    setTaskForm({...tForm});
  };

  return (
    <>
      <Main 
        taskButtonPanel = {<TaskButtonPanel handleTaskButton={handleTaskButton}/>}

        tskForm = {<TaskForm form={taskForm} handleTaskForm={handleTaskForm}/>}

        taskListSelect = { <TaskListSelect tasks = {taskList} handleTaskListSelect={handleTaskListSelect}/>}

        />
      
    </>
  );
}

export default App;
