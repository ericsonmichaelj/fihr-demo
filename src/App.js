    
import React,{ useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import Patient from './Patient'
import PatientList from './PatientList'
import Login from './Login'
import * as axios from 'axios'

export default function App() {
  const [ authData , setAuthData ] = useState({accessToken: null, retrievedFromServer: false, attemptRetrieval: false, errorMessage: null})
  const authenticateUser = async (username) => {
    try {
      const { data } = await axios.post('/api/login', { username })
      setAuthData({accessToken: data.accessToken, retrievedFromServer: true, attemptRetrieval: true})
    } catch (error) {
      if(error.response) {
        setAuthData({...authData, errorMessage: error.response.data})
      } else {
        setAuthData({...authData, errorMessage: 'Oops something went wrong. We are sorry'})        
      }
    }
  }

  useEffect(() => {
    const { accessToken, retrievedFromServer, attemptRetrieval } = authData;
    if(accessToken && !retrievedFromServer) return;
    if(!accessToken && attemptRetrieval) return;
    if(!accessToken && !retrievedFromServer) {
      const authToken = sessionStorage.getItem('accessToken')
      if(authToken && !accessToken) {
        setAuthData({
          ...authData,
          accessToken: authToken,
          attemptRetrieval: true,
        })
      } else {
        setAuthData({
          ...authData,
          attemptRetrieval: true,
        })
      }
    }
    if(retrievedFromServer && accessToken) {
      sessionStorage.setItem('accessToken', accessToken)
      setAuthData({
        ...authData,
        errorMessage: null,
        retrievedFromServer: false,
        attemptRetrival: true
      })
    }
  }, [authData]);
  const { accessToken, retrievedFromServer, attemptRetrieval, errorMessage  } = authData;
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/patient/:patientId">
          { attemptRetrieval ? <Patient accessToken={accessToken} />: <div>Loading Patient Page...</div> }
          </Route>

          <Route path="/login">
            <Login 
              handleSubmit={authenticateUser} 
              retrievedTokenFromServer={retrievedFromServer} 
              errorMessage={errorMessage} 
            />
          </Route>
          <Route path="/error">
            <div style={{color: 'red'}}>Oops! Something went wrong, please contact us.</div>
          </Route>
          <Route path="/callback">
            <Redirect to="/"/>
          </Route>
          <Route exact path="/">
          { attemptRetrieval ? <PatientList accessToken={accessToken}/>: <div>Loading PatientList Page...</div> }
          </Route>
          <Route path="*">
            <div>Page not found, sorry</div>
          </Route>
        </Switch>
    </Router>
  );
}