import React, { useEffect, useRef } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import qs from'querystring'
export default function Login({handleSubmit, retrievedTokenFromServer}) {
  const prevRetrivedTokenFromServerRef = useRef();
  const { sessionExpired, redirect, isLoggedIn } = qs.parse(window.location.search.substr(1))

  useEffect(() => {
    // went from true state to false state
    const prevRetrivedTokenFromServer = prevRetrivedTokenFromServerRef.current;
    prevRetrivedTokenFromServerRef.current = retrievedTokenFromServer
    if(!retrievedTokenFromServer && prevRetrivedTokenFromServer) {
      /// TO DO: fix it so that patient recieves it from global state
      if (!redirect) {
        window.location.href = `${window.location.origin}/`
      } else {
        window.location.href = `${window.location.origin}${redirect}`
      }
     }
     prevRetrivedTokenFromServerRef.current = retrievedTokenFromServer


  });
  return (
    <Container>
      <Row style={{'flexDirection': 'column'}}>
        <Card style={{padding: '2em', alignSelf: 'center', marginTop: '3em'}}>
          { sessionExpired ? <p style={{color: 'red'}}>Your session has expired</p> : ''}
          { isLoggedIn ? <p style={{color: 'red'}}>Please log in to continue</p> : ''}
          <h2>Please Login</h2>
        <form>
        <div className="form-group">
          <label htmlFor="userId">Username</label>
          <input type="userId" className="form-control" id="loginUserId" aria-describedby="userIdHelp" placeholder="Enter userId" />
        </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
        </Card>
      </Row>
    </Container>
  )
}
