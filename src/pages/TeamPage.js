import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import TeamMemberCard from "../components/TeamMemberCard";
import NavBar from "../frontend components/Navbar";
    
import Footer from "../frontend components/Footer";
import classes from "./teamPage.module.css"

const TeamPage = () => {
  const [allTeamData, setAllTeamData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:4000/allTeamData").then((response) => {
      setAllTeamData(response.data);
    });
  }, []);
  return (
    <>
    <NavBar/>
    <div  className={`${classes.grid} ${classes["auto-fit"]}`}>
      {allTeamData.map((teamMember) => {
        return (
          <TeamMemberCard className={classes.griditem}
            key={teamMember._id}
            teamMemberData={teamMember}
            
          ></TeamMemberCard>
        );
      })}
    </div>
    <Footer/>
    </>
  );
};

export default TeamPage;
