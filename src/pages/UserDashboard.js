import React from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from "react";
const UserDashboard = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  useEffect(()=>{
      const token = localStorage.getItem("token");
      if (token) {
        const user = jwt_decode(token);
        if (!user) {
          // localStorage.removeItem("token");
        } else {
          axios
            .get("http://localhost:4000/registeredEvents", {
              params: { currUserEmail: user.email },
            })
            .then((res) => {
              setRegisteredEvents([...new Set(res.data)]);
            });
        }
      }
  },[])
  return (
    <div>
      <h1>My Registrations</h1>
      {registeredEvents.length>0 && registeredEvents.map((event) => {
        return (
          <div key={Math.random()}>
            <h3 >{event}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default UserDashboard;
