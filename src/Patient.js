import React, { useState, useEffect } from 'react';
import { FhirResource, fhirVersions } from 'fhir-react';
import './App.css';
import 'fhir-react/build/style.css';
import 'fhir-react/build/bootstrap-reboot.min.css';
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Pagination } from 'react-bootstrap'
import qs from 'querystring'

function PaginationSection ({patientData, onNext, onBack, totalPages}) {
  const getNextUrl = () => {
    if(patientData && Array.isArray(patientData.link)) {
      for(const item of patientData.link) {
        if (item.relation === "next") {
          return item.url
        }
      }
    }
  }

  const nextUrl = getNextUrl();
  return (
    <Pagination>
  { totalPages - 1? <Pagination.Prev onClick={onBack}/> : null }
  { nextUrl && <Pagination.Next onClick={() => onNext(nextUrl)} /> }
  </Pagination>
  )
}

function PatientPanel ({patientData, onNext, onBack, totalPages}) {
  if(!patientData) {
    return <div>Loading Patient Data......</div>
  } 
  return (
    <div>
    ({patientData.entry.map((entry, id) => {
      return <FhirResource fhirResource={entry.resource} fhirVersion={fhirVersions.DSTU2} key={id}/>
    }) })
    <div className="center-content">
      <PaginationSection patientData={patientData} onNext={onNext} onBack={onBack} totalPages={totalPages}/>
    </div>
  </div>
  )
}

function Patient({accessToken, match }) {
  const { patientId } = useParams();
  const  [ patientCallData, setPatientCallData ]  = useState([])

  const goBack = () => {
    if(patientCallData.length > 0) {
      setPatientCallData(patientCallData.slice(0,patientCallData.length-1))
    }

  }

  const fetchPatientData = async(url, previousData) => {
    console.log('fetching patient data')
    if(!accessToken) {
      // TO DO: Get state outisde of App.jsx
      window.location.href = `${window.location.origin}/login?isLoggedOut=true`
    }
    try {
    const response = await axios.get(url, { 
      headers: {
      Authorization: `Bearer ${accessToken}`,
    }})
    setPatientCallData([...patientCallData, response.data])
    } catch (error) {
      if(error.response) {
        console.log(error.response)
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
    fetchPatientData(`https://api.1up.health/fhir/dstu2/Patient/${patientId}/$everything`)
  }, [accessToken]);
  const totalPages = patientCallData.length
  console.log('this is the accessTOken', accessToken)
  return (
    <div className="App">
      { totalPages ? 
        <PatientPanel 
          patientData={patientCallData[totalPages - 1]} 
          onNext={fetchPatientData} onBack={goBack}
          totalPages={totalPages}
        /> : 'Loading patient data' }
    </div>
  );
}

export default Patient;
