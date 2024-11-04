import React, { useEffect, useState } from 'react';

import * as microsoftTeams from "@microsoft/teams-js";
import TestPage from './TestPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router';
import CompanySelectorPage from './CompanySelectorPage';
import CCQPlusAppBar from './CCQPlusAppBar';

import CCQPage from './CCQPage';
import{Box} from '@mui/material'
import { getUserDataFromGraph, loginAndGetToken } from '../backend.js';

function App() {


//Stores the access token of the user
  const [accessToken, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);


  useEffect(()=> {

    async function runLogin() {
      let token = await loginAndGetToken(); //temp variable because we need to access it immediately after and state does not update immediately
      setAccessToken(token);
      setUserData(await getUserDataFromGraph(token));
      console.log("access Token: " + token);
    }

    runLogin();

  },[])
  



  return (
    (accessToken!= null) ? (
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to={"/tab"} />}></Route>
          <Route path="/tab" element={
            <>
              <CCQPlusAppBar />
              <CompanySelectorPage accessToken={accessToken} userData={userData} />
            </>
          } />
          <Route path='/ccq/:companyName' element={
            <>
              <Box sx={{
                width: '100%',
                height: '100vh',
                overflow: 'hidden', // Disable scrolling
                display: 'flex',
                flexDirection: 'column',
              }}>
                <CCQPlusAppBar />
                <Box sx={{
                  overflow: 'auto',
                }}>
                  <CCQPage accessToken={accessToken} userData={userData}/>
                </Box>
              </Box>
            </>
          } />

          <Route path='/adminview' element= {


          <>
            <h1>Hello World Admin</h1>
          </>
          }/>
        </Routes>
      </Router>
    ) : null
  );
}

export default App;
