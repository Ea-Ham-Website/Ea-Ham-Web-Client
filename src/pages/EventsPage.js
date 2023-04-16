import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import EventCard from "../components/Event/EventCard";
import NavBar from "../frontend components/Navbar";
import Footer from "../frontend components/Footer";
const EventsPage = () => {
  const [allEventData, setAllEventData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/allEventData").then((response) => {
      setAllEventData(response.data);
    });
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <div style={{ paddingTop: "60px" }}>
        {allEventData.map((event) => {
          return <EventCard key={event._id} eventData={event}></EventCard>;
        })}
      </div>
      <Footer></Footer>
    </>
  );
};

export default EventsPage;
