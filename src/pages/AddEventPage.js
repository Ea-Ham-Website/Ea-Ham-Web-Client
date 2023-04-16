import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddEventPage = () => {
  const Navigate = useNavigate();
  const [eventData, setEventData] = useState({
    eventName: "",
    eventDescription: "",
    eventRegStartDate: "",
    eventRegEndDate: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    eventHolderPhNo: "",
    eventPhoto: "",
    collaboration: "",
    rules: "",
    igLink: "",
    eventManagers: "",
  });
  const c1Handler = (e) => {
    setEventData({ ...eventData, eventName: e.target.value });
  };
  const c2Handler = (e) => {
    setEventData({ ...eventData, eventDescription: e.target.value });
  };
  const c3Handler = (e) => {
    setEventData({ ...eventData, eventRegStartDate: e.target.value });
  };
  const c4Handler = (e) => {
    setEventData({ ...eventData, eventRegEndDate: e.target.value });
  };
  const c5Handler = (e) => {
    setEventData({ ...eventData, eventDate: e.target.value });
  };
  const c6Handler = (e) => {
    setEventData({ ...eventData, eventTime: e.target.value });
  };
  const c7Handler = (e) => {
    setEventData({ ...eventData, eventLocation: e.target.value });
  };
  const c8Handler = (e) => {
    setEventData({ ...eventData, eventHolderPhNo: e.target.value });
  };
  const c9Handler = (e) => {
    setEventData({ ...eventData, eventPhoto: e.target.value });
  };
  const c10Handler = (e) => {
    setEventData({ ...eventData, collaboration: e.target.value });
  };
  const c11Handler = (e) => {
    setEventData({ ...eventData, rules: e.target.value });
  };
  const c12Handler = (e) => {
    setEventData({ ...eventData, igLink: e.target.value });
  };
  const c13Handler = (e) => {
    setEventData({ ...eventData, eventManagers: e.target.value });
  };
  const eventAddHandler = async (e) => {
    e.preventDefault();
    console.log(eventData);
    Navigate("/adminHome");
    const res = await axios({
      method: "post",
      url: "http://localhost:4000/addEvent",
      data: eventData,
    });
  };
  return (
    <div>
      <form onSubmit={eventAddHandler}>
        <label>Event Name</label>
        <input type="text" onChange={c1Handler} value={eventData.eventName} />
        <label>Event Description</label>
        <input
          type="text"
          onChange={c2Handler}
          value={eventData.eventDescription}
        />
        <label>Event Registration Start Date</label>
        <input
          type="date"
          onChange={c3Handler}
          value={eventData.eventRegStartDate}
        />
        <label>Event Registration End Date</label>
        <input
          type="date"
          onChange={c4Handler}
          value={eventData.eventRegEndDate}
        />
        <label>Event Date</label>
        <input type="date" onChange={c5Handler} value={eventData.eventDate} />
        <label>Event Time</label>
        <input type="time" onChange={c6Handler} value={eventData.eventTime} />
        <label>Event Location</label>
        <input
          type="text"
          onChange={c7Handler}
          value={eventData.eventLocation}
        />
        <label>Event Holder Ph No</label>
        <input
          type="text"
          onChange={c8Handler}
          value={eventData.eventHolderPhNo}
        />
        <label>Event Photo</label>
        <input type="text" onChange={c9Handler} value={eventData.eventPhoto} />
        <label>in Collaboration With</label>
        <input
          type="text"
          onChange={c10Handler}
          value={eventData.collaboration}
        />

        <label>Rules</label>
        <input type="text" onChange={c11Handler} value={eventData.rules} />

        <label>Instagram Link</label>
        <input type="text" onChange={c12Handler} value={eventData.igLink} />

        <label>Event Managers</label>
        <input
          type="text"
          onChange={c13Handler}
          value={eventData.eventManagers}
        />
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export default AddEventPage;
