import React, { useEffect } from 'react';
import { useState } from 'react';
const ParticipantsList = () => {
    const [participantsName,setParticipanstName]=useState([]);
    useEffect(()=>{
        setParticipanstName([...new Set(localStorage.getItem("participationList").split(","))])
    },[])
  return (
    <div >
    <h1>List</h1>
    <h2>Total No of participants of this event is : {participantsName[0]==="" ? '0' : participantsName.length}</h2>
    {participantsName.map((participant)=>{
        return <div key={Math.random()}>{participant}</div>
    })}
    </div>
  );
}

export default ParticipantsList;
