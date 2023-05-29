import React from "react";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Three from '../frontend components/Three'
import ECard2 from "../frontend components/ECard2"
import Carousel from "../frontend components/Carousel";
import NavBar from "../frontend components/Navbar";
import Footer from "../frontend components/Footer";
import HomePagecss from "./HomePagecss.css"
import videoFile from "../Gallery/images/v1.mp4"
// const Section=styled.div`
//   height: 100%;
//   scroll-snap-align: center;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   @media only screen and (max-width: 768px) {
//     height: 100%;
//   }
// `;

// const Container = styled.div`
//   height: 100%;
//   scroll-snap-align: center;
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   @media only screen and (max-width: 768px) {
//     width: 100%;
//     align-items: center;
//     justify-content: center;
//   }
// `;
// const Containers = styled.div`
// height: 100%;
// scroll-snap-align: center;
// width: 70%;
// display:grid;
// justify-content: center;
// @media only screen and (min-width: 768px) {
//   grid-template-columns: repeat(3, 1fr);
// }
// `;

// const Title = styled.h1`
//   font-size: 74px;
//   display: flex;
//   @media only screen and (max-width: 768px) {
//     text-align: center;
//   }
// `;

// const Left = styled.div`
//   flex: 2;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding-left:30px;
//   gap: 20px;
//   @media only screen and (max-width: 768px) {
//     flex: 1;
//     align-items: center;
//   }
// `;


const HomePage = () => {
  const Navigate = useNavigate();
  const [currUserData, setCurrUserData] = useState({});
  const [recentEventObj,setRecentEventObj]=useState({})
  // const [allEventData,setAllEventData]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:4000/allEventData").then((response) => {
      // setAllEventData(response.data);
      let allEventData=response.data;
      let recentEvent;
      if(allEventData.length>0){
        allEventData.sort(function(a, b) {
          var keyA = new Date(a.eventDate),
            keyB = new Date(b.eventDate);
          // Compare the 2 dates
          if (keyA < keyB) return -1;
          if (keyA > keyB) return 1;
          return 0;
        });
          recentEvent=allEventData[0];
      }
      // console.log("hi",recentEvent.eventDate);
      setRecentEventObj(recentEvent);
    });
  },[])
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        Navigate("/login");
      } else {
        axios
          .get("http://localhost:4000/getCurrUserData", {
            params: { currUserEmail: user.email },
          })
          .then((res) => {
            setCurrUserData(res.data);
          });
      }
    }
    //after logging out
    // else {
    //   // Navigate("/login");
    // }
  }, [Navigate]);
  // useEffect(()=>{
    let countDownDate = new Date("00");
    if(Object.keys(recentEventObj).length>0){
      let recentEventDat=new Date(recentEventObj.eventDate);
      let recentEventTime=recentEventObj.eventTime.substr(0,2);
      countDownDate = recentEventDat.getTime()+(Number(recentEventTime)-5.5)*3600*1000;
    }
    const timerFunction = setInterval(() => {
    const currentDate = new Date().getTime();
    const finalTime = countDownDate - currentDate;
  
    if (finalTime > 0) {
      const days = Math.floor(finalTime / (1000 * 60 * 60 * 24));
  
      const hours = Math.floor(
        (finalTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
  
      const minutes = Math.floor((finalTime % (1000 * 60 * 60)) / (1000 * 60));
  
      const seconds = Math.floor((finalTime % (1000 * 60)) / 1000);
  
      document.getElementById("days").innerHTML = days;
  
      document.getElementById("hours").innerHTML = hours;
  
      document.getElementById("minutes").innerHTML = minutes;
  
      document.getElementById("seconds").innerHTML = seconds;
      document.getElementById("timer").innerHTML = `${recentEventObj.eventName}`;
  
    } else {
      clearInterval(timerFunction);
      // document.getElementById("timer").innerHTML = `${recentEventObj.eventName}`;
    }
  }, 1000);

  // },[])
  return (
    <div>
    <NavBar/>
    
    {/* <Section> */}
    {/* <Container> */}
    {/* <Left> */}
    {/* <h1 style={{color:"white"}}>EA & HAM</h1> */}
    {/* </Left> */}
    {/* <Three/> */}
    {/* </Container> */}
    {/* <h1 style={{marginBottom:"40px"}}>Technologies We Are Working On</h1> */}
    {/* </Section> */}
    {/* <Carousel/> */}
    {/* <Section> */}
    {/* <h1 style={{marginBottom:"100px",marginTop:"50px"}}>Upcoming Events</h1> */}
    {/* <Containers style={{marginBottom:"50px"}} > */}
    {/* <ECard2/>
    <ECard2/>
    <ECard2/> */}
    {/* </Containers> */}
    {/* </Section> */}


    {/* <!-- About Box Starts here --> */}
    <div style={{backgroundColor: "black",paddingTop:"75px"}} id="Home">
      <video  id="myVideo" muted autoPlay  loop>
        <source src={videoFile} type="video/mp4"/>
      </video>
    </div>
    <div class="about-container">
      <div class="about">
        <div class="about-heading"><h1>About Us</h1></div>
        <div class="about-text">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum,
          similique quibusdam non ducimus facilis ratione atque omnis rerum, sed
          hic illum vitae dicta aperiam tempora tenetur? Totam harum maxime,
          maiores dolores repellat alias deleniti ipsa vero soluta rerum
          sapiente officia, at ipsum modi, incidunt nihil voluptas amet iste
          sequi. Praesentium, nisi. Natus sint omnis corporis, saepe eaque a
          modi eligendi. Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Magni amet quidem doloremque vel voluptas exercitationem quaerat
        </div>
      </div>
    </div>
    {/* <!-- About Box ends Here --> */}

    {/* <!-- What We do Starts Here --> */}

    <div class="do-header">
      <h1>What We Do?</h1>
    </div>
    <div class="row1-container">
      <div class="box box-down cyan">
        <h2>Supervisor</h2>
        <p>Monitors activity to identify project roadblocks</p>
        <img
          src="https://assets.codepen.io/2301174/icon-supervisor.svg"
          alt=""
        />
      </div>

      <div class="box red">
        <h2>Team Builder</h2>
        <p>
          Scans our talent network to create the optimal team for your project
        </p>
        <img
          src="https://assets.codepen.io/2301174/icon-team-builder.svg"
          alt=""
        />
      </div>

      <div class="box box-down blue">
        <h2>Calculator</h2>
        <p>Uses data from past projects to provide better delivery estimates</p>
        <img
          src="https://assets.codepen.io/2301174/icon-calculator.svg"
          alt=""
        />
      </div>
    </div>
    <div class="row2-container">
      <div class="box orange">
        <h2>Karma</h2>
        <p>Regularly evaluates our talent to ensure quality</p>
        <img src="https://assets.codepen.io/2301174/icon-karma.svg" alt="" />
      </div>
    </div>
    {/* <!-- What We do Ends Here --> */}

    {/* <!-- Timer Starts Here --> */}

    <div class="halloween_container">
      <h1>Next Event</h1>
      <h2 id="timer" style={{marginTop:"50px"}}></h2>
      <div class="countdown_time">
        <div class="days">
          <h1 id="days"></h1>
          <h2>Days</h2>
        </div>

        <div class="hours">
          <h1 id="hours"></h1>
          <h2>Hours</h2>
        </div>

        <div class="minutes">
          <h1 id="minutes"></h1>
          <h2>Minute</h2>
        </div>

        <div class="seconds">
          <h1 id="seconds"></h1>
          <h2>Seconds</h2>
        </div>
      </div>
    </div>

    {/* <!-- Timer Ends Here --> */}
    <Footer/>
    </div>
  );
};

export default HomePage;
