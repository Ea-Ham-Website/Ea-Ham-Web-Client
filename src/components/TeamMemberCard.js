import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import classes from "./teamMemberCard.module.css"
import { useNavigate } from "react-router-dom";
const TeamMemberCard = (props) => {
  const Navigate=useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const removeHandler = () => {
    // window.location.reload(false)
    axios
      .get("http://localhost:4000/deleteMember", {
        params: { key: props.teamMemberData._id },
      })
      .then(window.location.reload(false));
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      const currUserEmail = user.email;
      let res = axios
        .get("http://localhost:4000/getCurrUserData", {
          params: { currUserEmail: currUserEmail },
        })
        .then((response) => {
          if (response.data.userType === "admin") setIsAdmin(true);
        });
    }
  }, []);
  const addMemberHandler = () => {
    Navigate("/addMember");
  };
  return (
    // <div style={{ border: "2px solid green", margin: "10px" }}>
    //   {isAdmin && <button onClick={removeHandler}>Remove From Team</button>}
    //   <div>
    //     <h2>{props.teamMemberData.name}</h2>
    //     <h3>{props.teamMemberData.position}</h3>
    //   </div>
    // </div>
    <>
      <div className={`${classes["card-container"]}`} >
    {/* {isAdmin && <button className={classes.buttons} onClick={removeHandler}>Remove From Team</button>} */}
        <img
          className={classes.round}
          src="https://randomuser.me/api/portraits/women/79.jpg"
          alt="user"
        />
        <h3>{props.teamMemberData.name}</h3>
        <h6>{props.teamMemberData.position}</h6>
       
        <div className={classes.buttons} style={{backgroundColor: "#231E39"}}>
          {/* <button className={classes.primary}>Message</button> */}
          {/* <button className={`${classes.primary} ${classes.ghost}`}>Following</button> */}
          {isAdmin && <button className={`${classes.primary} ${classes.ghost}`} onClick={removeHandler}>Delete</button>}
          {isAdmin && <button onClick={addMemberHandler}>Add a New Team Member</button>}
        </div>
        {/* <div className={classes.skills}>
          <h6>Skills</h6>
          <ul  style={{backgroundColor: "#231E39"}}>
            <li style={{backgroundColor: "#231E39"}} >UI / UX</li>
            <li style={{backgroundColor: "#231E39"}}>Front End Development</li>
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default TeamMemberCard;
