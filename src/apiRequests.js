import {useEffect, useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import statusEnums from './statusEnums';
const baseURL='http://localhost:5000/api';

// this request is used to test node mysql statements
// the server parses the statement and returns
// a string of the parse for checking.
function sqlTest(){
  console.log("sqlTest request hit!");
  let testData=[
                {description:'Empty bin',due:'2001-10-12'},
                {description:'Wash car',due:'2001-10-12'},
                {description:'Shower & shave',due:'2001-10-12'}
               ]
  let inserts = testData.map( Object.values );
  console.log ('Inserts:',[inserts]);

  let payload={statement:`INSERT  INTO mytodos (description, due) VALUES ?`,
              inserts:inserts}
  axios.post(`${baseURL}/mytodos/sqltest`,payload)
  .then(res=>console.log(res.data))
  .catch(err=>console.log(err.message))
  
}
//------------------
// todo:taskForm
// newToDo: todo stripped of id: and stat: properties
// todoPost: newToDo converted to array of values
function addToDo(todo,taskList,setTaskList,setTaskForm,initTaskForm){
  // strip id: and stat properties from todo
  let newToDo={task:todo.task,now:todo.now}
  // convert obj to values array for mysql
  let todoPost = Object.keys(newToDo).map(key=>newToDo[key]);
  
  axios.post(`${baseURL}/mytodos/add`,todoPost)
  .then (res=>{
    //update 'todo' with 'stat' flag and sql's 'id'...
    // this is needed on the list should the user wish to immediately
    // update or delete the item - both operations need and id.
    // Note that ids are included when the list is initially fetched on boot-up,
    // but is ineficient to re-load the list after each post.
    todo.id=res.data.insertId;
    todo.stat=statusEnums.VIRGIN;
    //convert date to UK format
    let temp = moment(todo.now,'YYYY-MM-DD').format('DD-MM-YYYY');
    todo.now = temp;
    setTaskList([{ ...todo }, ...taskList]);
    setTaskForm(initTaskForm());
  })
  .catch(err =>console.log('Axios error in addToDo:',err.message)); 
 
}

function addAll(items){
  let allItems = items.map( Object.values );
  console.log('Hello!', allItems);
  
  axios.post(`${baseURL}/mytodos/addAll`,allItems)
  .then (res=>(console.log('Added ', res.data.affectedRows)))
  .catch(err =>console.log('Axios error in addToDo:',err.message)); 
 
}

function deleteId(id,taskList,setTaskList,setTaskForm,initTaskForm){
  axios.delete(`${baseURL}/mytodos/delete/${id}`)
  .then (res => {
    console.log('Delete Ok:', res.data);
    let temp = taskList.filter(i => i.id !== id);
    setTaskList([...temp]);
    setTaskForm(initTaskForm());
  })
  .catch(err =>console.log('Axios error in addToDo:',err.message)); 
}

function updateId(todo,taskList,setTaskList,setTaskForm,initTaskForm){
  console.log('todo @ updateId:', todo);
   // extract 'task' and 'now' properties from todo
   //let newToDo={task:todo.task,now:todo.now}
   // convert obj to values array for mysql
   //let todoUpdate = Object.keys(newToDo).map(key=>newToDo[key]);
   let updatedTodo = {task:todo.task,now:todo.now}
   console.log('Update todo obj on axios:', updatedTodo);
    
    axios.put(`${baseURL}/mytodos/update/${todo.id}`,updatedTodo)
      .then (res => {
      
        let temp = taskList.map(i =>{ 
          if ( i.id === todo.id){
              let ukDate = moment(todo.now,'YYYY-MM-DD').format('DD-MM-YYYY');
              i.now = ukDate; 
              i.task = todo.task;
              console.log('Updated i=',i)
              return {...i};
          }  //  if id === todo.id   
          return i;
        }) // map
        setTaskList([ ...temp]);
        setTaskForm(initTaskForm())
    }) // then
    .catch(err =>console.log('Axios error in updateId:',err.message)); 
   
} //updateId

function deleteByIds(deleteIds){
  //let allItems = items.map( Object.values );
  console.log('deleteByIds !', deleteIds);
  axios.post(`${baseURL}/mytodos/deleteAll`,deleteIds)
  .then (res=>(console.log('Deleted ', res.data.affectedRows)))
  .catch(err =>console.log('Axios error in deleteByIds:',err)); 
 
}

//-------------------------
// I have used a custom hook here as it is the only way to pass a parameter
// to useEffect for it to access to the parent state, required because the 
// useffect is outside the scope of the parent's state.
function useAutoFetch( url, setTaskList ){

    useEffect(()=>{
      axios.get(url)
      .then ( res => { 
        // reformate MySQL ISO Date/Time to UK Date  
        for (let i of res.data){
          i.due=moment(i.due).format('DD-MM-YYYY'); 
        }  
        // map db table fields to UI keys - DB field names & keys are different
        // ToDo : change keys to match field names
        const statArry = ['N','U','D','V'];  // test data to insert random status
        let db = res.data.map(i=>(
          { id:i.todo_id,
            stat:statArry[Math.floor(Math.random()*statArry.length)],
            selectIx:null,
            task:i.description,
            now:i.due,
          }));
          /*
          let db = res.data.map(i=>({stat:statusEnums.VIRGIN,
            task:i.description,
            now:i.due}));
            */
        // add status flag property-defined in statusEnums- to each element
        setTaskList(db)
        console.log(db)
      })
      .catch( err => { 
          console.log('useAutoEffect error:',err.message)
        });
    },[]);  
}// useAutoEffect


//---------------------------
export {baseURL, addToDo, deleteId, updateId, useAutoFetch,addAll,deleteByIds,
sqlTest};