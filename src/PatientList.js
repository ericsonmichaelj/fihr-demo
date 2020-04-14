import React, { useState, useEffect } from 'react';
import * as axios from 'axios'
import qs from 'querystring'
import { isArray } from 'util';
import { Container } from 'react-bootstrap'

function PatientBasicInfo({entry}) {
  if(entry && entry.resource &&  isArray(entry.resource.name)) {
    console.log()
    return <a 
    href={`/patient/${entry.resource.id}`}
    style={ {color: 'blue', textDecoration: 'underline', margin: '5px'} }>{entry.resource.name[0].text}</a> 
  }
  return null
}

function PatientList({accessToken}) {
  const  [ patientList, setPatientList ]  = useState([])
  const fetchPatientList = async(url, previousData) => {
    if(!accessToken) {
      const queryPath = qs.stringify({
        isLoggedOut: true,
        redirect: window.location.pathname
      })
      // TO DO: Get state outisde of App.jsx
      window.location.href = `${window.location.origin}/login?${queryPath}`
    }
    try {
    const response = await axios.get(url, { 
      headers: {
      Authorization: `Bearer ${accessToken}`,
    }})
    setPatientList(response.data.entry)
    } catch (error) {
      if(error.response) {
        if(error.response.status === 401) {
          const queryPath = qs.stringify({
            sessionExpired: true,
            redirect: window.location.pathname
          })
          window.location.href = `${window.location.origin}/login?${queryPath}`
          return       
        }
      }
      window.location.href = `${window.location.origin}/error`
    }
  }
  useEffect(() => {
    fetchPatientList(`https://api.1up.health/fhir/dstu2/Patient/`)
  }, []);
  return (
    <Container style={{marginTop: '1em'}}>
      <h2>Click on a patient to learn more:</h2>
      <div>
        { patientList.map((entry) => {
          console.log(entry.fullUrl)
          return <PatientBasicInfo entry={entry} key={entry.fullUrl} />
        }) }

      </div>
    </Container>
  );
}

export default PatientList;