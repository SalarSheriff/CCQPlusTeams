import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

import { Button, Box, Tab, TextField, Typography } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";


import CircularProgress from '@mui/material/CircularProgress';
import LogDisplayTable from './LogsDisplayTable.jsx';
import dayjs from 'dayjs';

import {Client} from '@microsoft/microsoft-graph-client';
import * as microsoftTeams from '@microsoft/teams-js';
import { extractFieldsFromLogs, getFilteredLogs, uploadLog } from '../backend.js';




//Transition for the dialogue modal
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//The page that displays the actual CCQ view


function CCQPage({accessToken, userData}) {
 
  
 






  let dummyLogs = [{ time: "1300", timeOut: "N/a", name: "John Doe", message: "No issues", action: "Patrolling" }];
  dummyLogs = [
    { time: "1300", timeOut: "N/a", name: "John Doe", message: "No issues", action: "Patrolling" },
    { time: "1310", timeOut: "N/a", name: "Jane Smith", message: "Checked perimeter", action: "Patrolling" },
    { time: "1320", timeOut: "N/a", name: "Alice Johnson", message: "All clear", action: "Patrolling" },
    { time: "1330", timeOut: "N/a", name: "Bob Brown", message: "No issues", action: "Patrolling" },
    { time: "1340", timeOut: "N/a", name: "Charlie Davis", message: "Checked gates", action: "Patrolling" },
    { time: "1350", timeOut: "N/a", name: "Diana Evans", message: "All clear", action: "Patrolling" },
    { time: "1400", timeOut: "N/a", name: "Eve Foster", message: "No issues", action: "Patrolling" },
    { time: "1410", timeOut: "N/a", name: "Frank Green", message: "Checked cameras", action: "Patrolling" },
    { time: "1420", timeOut: "N/a", name: "Grace Harris", message: "All clear", action: "Patrolling" },
    { time: "1430", timeOut: "N/a", name: "Henry Irving", message: "No issues", action: "Patrolling" }
  ];


  const navigate = useNavigate();

  const { companyName } = useParams();
  let [logs, setLogs] = useState(dummyLogs);
  let [dataUpdateTrigger, setDataUpdateTrigger] = useState(0); //Used to trigger a data update
  
  //State for managing presence patrol timer
  const [patrolTimer, setPatrolTimer] = useState(0);
  const [isPatrolling, setIsPatrolling] = useState(false);

  const [patrolComments, setPatrolComments] = useState("");

  //This will be used to track if the data has been loaded or not. Controls displaying "<Circular Indeterminate/>"
  const [dataLoaded, setDataLoaded] = useState(false);

  const [dialogueOpen, setDialogueOpen] = React.useState(false);
  const [dialogueTitle, setDialogueTitle] = React.useState("");
  const [dialogueMessage, setDialogueMessage] = React.useState("");

  const [specialMessageComments, setSpecialMessageComments] = useState("");

  //Reference to the table container so that we can access its scroll
  const tableContainerRef = useRef(null);
  const [previousLogs, setPreviousLogs] = useState([]); // Used to check if logs have changed, this ensures we don't scroll down to the bottom of the table if the user has scrolled up and the data is refreshed with no changes


  //Scroll to the bottom of the table when new logs are added and when the table is loaded
  useEffect(() => {
    const container = tableContainerRef.current;
    if (container && (JSON.stringify(previousLogs) !== JSON.stringify(logs))) {
      setPreviousLogs(logs);
      container.scrollTop = container.scrollHeight;
    }
  }, [logs]);


  useEffect(() => {

    //initial load
    async function fetchData() {

      let data = await getFilteredLogs(accessToken, "all", companyName, dayjs().format("MM/DD/YY"), dayjs().format("MM/DD/YY"))
      
      
      setLogs(extractFieldsFromLogs(data));
    }
    fetchData().then(() => { setDataLoaded(true) });
    //setInterval(fetchData, dataFetchRate);
  }, [dataUpdateTrigger])


  //Manage the patrol timer
  useEffect(() => {
    let timer;
    if (isPatrolling) {
      timer = setInterval(() => {
        setPatrolTimer(prevTime => prevTime + 1);
      }, 1000); // Increment every second
    }

    return () => {
      clearInterval(timer);
    };
  }, [isPatrolling]);





  function handleDialogOpen(title, message) {
    setDialogueTitle(title);
    setDialogueMessage(message);
    setDialogueOpen(true);
  }

  function handleDialogueCancel() {
    setDialogueOpen(false);
  }


  //based on the current dialogue title and message, this function will handle the accept button
  //Rather than having multiple functions and Dialog Objects for each dialogue, this function will handle all of them
  function handleDialogueAccept() {

    if (dialogueTitle === "Sign Out") {

//upload log
uploadLog(accessToken, "signOut"+userData.username + Math.floor(Math.random() * 10000000) + 1, dayjs().format("MM/DD/YY"), dayjs().format("HHmm"), userData.username, userData.username + " signed out", "relieved", companyName, "n/a");

      setDialogueOpen(false);
      navigate("/");


      //HAVE TO ADD A DELAY HERE TO ENSURE THE LOG IS UPLOADED BEFORE NAVIGATING




    }
    else if (dialogueTitle === "Inspection") {


      //Begin a patrol
      setIsPatrolling(true);
      setDialogueOpen(false);







    }
    else if (dialogueTitle === "End Inspection") {
      setIsPatrolling(false);

      setDialogueOpen(false)


      let randomLogName = "patrol"+userData.username + Math.floor(Math.random() * 10000000) + 1;
      //upload log
      uploadLog(accessToken, randomLogName, dayjs().format("MM/DD/YY"), dayjs().format("HHmm"), userData.username, userData.username + " conducted a presence patrol for " + patrolTimer + " seconds. \nComments: " + patrolComments , "patrol", companyName, "n/a");
      setDataUpdateTrigger(dataUpdateTrigger + 1);

      //Reset timer
      setPatrolTimer(0);
    }
    else if (dialogueTitle === "Special Message") {


      //upload log
      uploadLog(accessToken, "specialMessage"+userData.username + Math.floor(Math.random() * 10000000) + 1, dayjs().format("MM/DD/YY"), dayjs().format("HHmm"), userData.username, userData.username + " sent a special message: " + specialMessageComments, "specialMessage", companyName, "n/a");
      setDataUpdateTrigger(dataUpdateTrigger + 1);
      setDialogueOpen(false);
      setSpecialMessageComments("");
    }



  }
  function handlePatrolCommentsChange(event) {
    setPatrolComments(event.target.value);
  }
  function handleSpecialMessageCommentsChange(event) {


    setSpecialMessageComments(event.target.value);
  }

  return (


    <>
      {/* If the data ins't loaded, display a circular progress bar */}
      {!dataLoaded && <CircularProgress />}


      {/* If the data is loaded then display the table */}
      {dataLoaded && <>


        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '10%',
          marginRight: '10%',
          textAlign: 'center',
        }}>
          <Typography variant='h2'>{companyName} CCQ</Typography>


          <LogDisplayTable logs={logs} tableContainerRef={tableContainerRef} />



          <Button variant='contained' color='success' onClick={() => {

            //If the button is clicked begin a patrol. If a patrol is already being conducted, end the patrol
            if (!isPatrolling) {
              handleDialogOpen("Inspection", "Begin inspection for " + companyName + "?");
            }
            else {
              handleDialogOpen("End Inspection", "End inspection for " + companyName + "?");
            }

          }} > {isPatrolling ? "Inspecting for: " + patrolTimer + " seconds" : "Begin Inspection"}</Button>




          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '2',

          }}>
            <TextField onChange={handleSpecialMessageCommentsChange} value={specialMessageComments} placeholder='Special Message'></TextField>


            <Button variant='contained' color='warning' onClick={() => {

              handleDialogOpen("Special Message", "Send special message to " + companyName + "?");

            }}>Send Special Message</Button>
          </Box>

          <Button variant='contained' onClick={() => {
            handleDialogOpen("Sign Out", "Are you sure you want to sign out?");



          }}>Sign Out</Button>

          
        </Box>

        <Dialog
          open={dialogueOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleDialogueCancel}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{dialogueTitle} </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">

              {dialogueMessage}


              <br />
              {/* If closing a patrol display an input for a message too. */}
              {isPatrolling && <><TextField onChange={handlePatrolCommentsChange} placeholder='Patrol Comments' value={patrolComments}></TextField></>}


            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogueCancel}>Close</Button>
            <Button onClick={handleDialogueAccept}>Ok</Button>
          </DialogActions>
        </Dialog>

      </>}
    </>
  )
}


export default CCQPage