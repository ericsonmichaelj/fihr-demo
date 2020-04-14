    
import React,{ useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Patient from './Patient'
import Login from './Login'
import * as axios from 'axios'

export default function App() {
  const [ authData , setAuthData ] = useState({accessToken: null, retrievedFromServer: false, attemptRetrieval: false})
  const authenticateUser = async (event) => {
    event.preventDefault()
    const { data } = await axios.post('/api/login')
    setAuthData({accessToken: data.accessToken, retrievedFromServer: true, attemptRetrieval: true})
  }

  useEffect(() => {
    const { accessToken, retrievedFromServer } = authData;
    if(accessToken && !retrievedFromServer) return;
    if(!accessToken && attemptRetrieval) return;
    if(!accessToken && !retrievedFromServer) {
      const authToken = sessionStorage.getItem('accessToken')
      if(authToken && !accessToken) {
        setAuthData({
          accessToken: authToken,
          retrievedFromServer,
          attemptRetrieval: true,
        })
      } else {
        setAuthData({
          accessToken,
          retrievedFromServer,
          attemptRetrieval: true,
        })
      }
    }
    if(retrievedFromServer && accessToken) {
      sessionStorage.setItem('accessToken', accessToken)
      setAuthData({
        accessToken,
        retrievedFromServer: false,
        attemptRetrival: true
      })
    }
  }, [authData]);
  const { accessToken, retrievedFromServer, attemptRetrieval  } = authData;
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/patient">
          { attemptRetrieval ? <Patient accessToken={accessToken} />: <div>Loading Patient Page....</div> }
          </Route>
          <Route path="/login">
            <Login handleSubmit={authenticateUser} retrievedTokenFromServer={retrievedFromServer} />
          </Route>
          <Route path="/error">
            <div style={{color: 'red'}}>Oops! Something went wrong, please contact us.</div>
          </Route>
          <Route path="*">
            <div>Path not found, sorry</div>
          </Route>
        </Switch>
    </Router>
  );
}