import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import Img from "../../Gallery/images/flutter/f1.jpeg";
import { Fragment } from "react";

// import { Autolinker } from "autolinker";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaMapMarkerAlt, FaFacebook, FaInstagram } from "react-icons/fa";
import { Header, BackDrop, Body, Container, Main } from "./Modal.style";
import dayjs from "dayjs";
// import { useAuth } from "../../hooks/auth";
// import Loader from "../Loader";
import { useApi } from "./api";

const SocialIcon = ({ type, ...args }) => {
  switch (type) {
    case "facebook":
      return <FaFacebook {...args} />;

    case "instagram":
      return <FaInstagram {...args} />;

    default:
      return null;
  }
};

// adding constants for now
const social_media = "facebook,a;instagram,b";
const rules =
  "The King may move one square in any direction, so long as no piece is blocking his path.The Queen may move any number of squares straight or diagonally in any direction.The Rook may move in a straight line, any number of squares horizontally or vertically.The Bishop may move any number of squares diagonally";

const EventCard = (props) => {
  const Navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [currUserId, setCurrUserId] = useState("");
  const eventDeleteHandler = () => {
    window.location.reload(false);
    axios.get("http://localhost:4000/deleteEvent", {
      params: { key: props.eventData._id },
    });
  };
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
          setCurrUserId(response.data._id);
          if (response.data.userType === "admin") setIsAdmin(true);
          axios
            .get("http://localhost:4000/isRegisteredOnEvent", {
              params: {
                currUserId: response.data._id,
                currEventId: props.eventData._id,
              },
            })
            .then((res) => {
              if (res.data === true) setIsRegistered(true);
            });
        });
    }
  }, []);
  const eventRegisterHandler = async () => {
    window.location.reload(false);
    axios
      .get("http://localhost:4000/registerEvent", {
        params: { currUserId: currUserId, currEventId: props.eventData._id },
      })
      .then(() => {
        window.alert("successfully");
      });
  };
  const allParticipantsHandler = async () => {
    axios
      .get("http://localhost:4000/allParticipants", {
        params: { currEventId: props.eventData._id },
      })
      .then((res) => {
        console.log(res.data)
        localStorage.setItem("participationList", [res.data]);
      })
      .then(() => {
        
        Navigate("/participantsList");
      });
  };
  const eventAddHandler = () => {
    Navigate("/addEvent");
  };
  return (
    <div className="main_body">
      {/* <Container> */}
      {/* <Loader loading={loading} /> */}
      {/* <BackDrop> */}

      {!isAdmin && (
        <Body>
          {/* <Header>
      <AiOutlineCloseCircle onClick={onClose} className="close" />
    </Header> */}
          <Main>
            <div>
            
              <div className="main">
                <h1 className="title">{props.eventData.eventName}</h1>
                <img src={Img} alt="event-poster" />
                {/* <h2 className="sub-title">{summary}</h2> */}

                <div className="d-md-flex justify-content-between align-items-center time-venue">
                  <div className="time">
                    {props.eventData.eventRegistrationStartDate && (
                      <div>
                        Start:{" "}
                        {dayjs(
                          props.eventData.eventRegistrationStartDate
                        ).format("ddd, MMM D, YYYY h:mm A")}
                      </div>
                    )}
                    {props.eventData.eventRegistrationEndDate && (
                      <div>
                        End:{" "}
                        {dayjs(props.eventData.eventRegistrationEndDate).format(
                          "ddd, MMM D, YYYY h:mm A"
                        )}
                      </div>
                    )}
                  </div>
                  <div className="venue">
                    <FaMapMarkerAlt /> {props.eventData.eventLocation}
                  </div>
                </div>
              </div>
              {props.eventData.igLink && (
                <div className="social">
                  {social_media.split(";").map((social) => {
                    const [type, link] = social.split(",");
                    return (
                      <a
                        target="_blank"
                        rel="noreferrer"
                        key={social}
                        href={link}
                      >
                        <SocialIcon type={type} />
                      </a>
                    );
                  })}
                </div>
              )}
              <hr />
              <div className="content">
                {
                  <div className="description">
                    <h2>Description</h2>
                    <p>{props.eventData.eventDescription}</p>
                  </div>
                }

                {props.eventData.rules && (
                  <div className="rules">
                    <h2>Rule Book</h2>
                    <ul>
                      {props.eventData.rules.split(".").map((rule) => (
                        <li key={rule}>{rule}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {
                  // event_manager &&
                  <div className="event-managers">
                    <h2>Event Managers</h2>
                    <ul>
                      {
                        <div>
                          Contact No.:
                          <a
                            href={`tel:${props.eventData.eventHolderPhNumber}`}
                          >
                            {props.eventData.eventHolderPhNumber}
                          </a>
                          <p>{props.eventData.eventManagers}</p>
                        </div>

                        /* event_manager.split("\n").map((manager) => { */
                        //   const [name, mobile] = manager.split(",");
                        //   return (
                        //     <Fragment key={manager}>
                        //       <div>{name}</div>
                        //       <div>
                        //         Contact No.:
                        //         <a href={`tel:${props.eventData.eventHolderPhNumber}`}>{props.eventData.eventHolderPhNumber}</a>
                        //       </div>
                        //     </Fragment>
                        //   );
                        // })
                      }
                    </ul>
                  </div>
                }
                {isRegistered ? (
                  <button className="btn btn-primary mt-3" disabled>
                    Already registered
                  </button>
                ) : (
                  <button
                    className="btn btn-primary mt-3"
                    onClick={eventRegisterHandler}
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          </Main>
        </Body>
      )}
      {/* </BackDrop> */}

      {/* </Container>  */}

      {isAdmin && (
        <div>
          <div>
            <h3>{props.eventData.eventName}</h3>
          </div>
          <div>
            <p>{props.eventData.eventDescription}</p>
          </div>
        </div>
      )}

      {isAdmin && (
        <button onClick={allParticipantsHandler}>Participants List</button>
      )}

      {isAdmin && <button onClick={eventDeleteHandler}>Delete Event</button>}
      {/* {isAdmin && <button onClick={eventAddHandler}>Add Event</button>} */}
    </div>
  );
  // })
};

export default EventCard;
