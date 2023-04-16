import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../components/Event/EventCard";
import jwt_decode from "jwt-decode";
import TeamMemberCard from "../components/TeamMemberCard";
import NavBar from "../frontend components/Navbar";
const AdminPage = () => {
  const Navigate = useNavigate();

  const eventAddHandler = () => {
    Navigate("/addEvent");
  };
  const [allEventData, setAllEventData] = useState([]);
  const [allTeamData, setAllTeamData] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        Navigate("/login");
      }
    }
    //after logginf out
    else {
      Navigate("/login");
    }
  }, [Navigate]);

  useEffect(() => {
    axios.get("http://localhost:4000/allEventData").then((response) => {
      setAllEventData(response.data);
    });
    axios.get("http://localhost:4000/allTeamData").then((response) => {
      setAllTeamData(response.data);
    });
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("token");
    Navigate("/login");
  };
  const addMemberHandler = () => {
    Navigate("/addMember");
  };
  return (
    <div>
      <NavBar></NavBar>
      <div>
        <button onClick={logoutHandler}>Logout</button>
      </div>
      <div>
        <div>
          <h1>Events</h1>
          {allEventData.map((event) => {
            return <EventCard key={event._id} eventData={event} />;
          })}
        </div>
        <button onClick={eventAddHandler}>Add Event</button>
      </div>
      <div>
        <h1>Team Members</h1>
        {allTeamData.map((teamMember) => {
          return (
            <TeamMemberCard key={teamMember._id} teamMemberData={teamMember} />
          );
        })}
        <button onClick={addMemberHandler}>Add a New Team Member</button>
      </div>
    </div>
  );
};

export default AdminPage;
