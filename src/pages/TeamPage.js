import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TeamMemberCard from "../components/TeamMemberCard";
import NavBar from "../frontend components/Navbar";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Footer from "../frontend components/Footer";
import classes from "./teamPage.module.css"

const TeamPage = () => {
  const [allTeamData, setAllTeamData] = useState([]);
  const Navigate=useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
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
  useEffect(() => {
    axios.get("http://localhost:4000/allTeamData").then((response) => {
      setAllTeamData(response.data);
    });
  }, []);
  const addMemberHandler = () => {
    Navigate("/addMember");
  };
  return (
    <>
    <NavBar/>
    <div  className={`${classes.grid} ${classes["auto-fit"]}`}>
      {allTeamData.map((teamMember) => {
        return (<>
          <TeamMemberCard className={classes.griditem}
            key={teamMember._id}
            teamMemberData={teamMember}
          ></TeamMemberCard>
        </>
        );
      })}
    </div>
      {isAdmin && <div><button style={{marginLeft:"20px"}} onClick={addMemberHandler}>Add a New Team Member</button></div>}
    <Footer/>
    </>
  );
};

export default TeamPage;
