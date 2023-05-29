import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import EventCard from "../components/Event/EventCard";
import NavBar from "../frontend components/Navbar";
import Footer from "../frontend components/Footer";
const EventsPage = () => {
  const [allEventData, setAllEventData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      // console.log(user)
      const currUserEmail = user.email;
      // setCurrUserId(user._id);//?????
      axios
        .get("http://localhost:4000/getCurrUserData", {
          params: { currUserEmail: currUserEmail },
        })
        .then((response) => {
          // console.log(response.data)
          if (response.data.userType === "admin") {
            setIsAdmin(true);
          }
        });
    }
  }, []);
  useEffect(() => {
    axios.get("http://localhost:4000/allEventData").then((response) => {
      setAllEventData(response.data);
    });
  }, []);
  const Navigate=useNavigate();
  const addEventHandler=()=>{
    Navigate("/addEvent")
  }
  return (
    <>
      <NavBar></NavBar>
      <div style={{ paddingTop: "60px" }}>
        {allEventData.map((event) => {
          return <EventCard key={event._id} eventData={event}></EventCard>;
        })}
      </div>
      <div>
        {isAdmin && <button onClick={addEventHandler}>Add Event</button>}
      </div>
      <Footer></Footer>
    </>
  );
};

export default EventsPage;
