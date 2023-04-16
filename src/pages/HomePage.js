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
const Section=styled.div`
  height: 100%;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    height: 100%;
  }
`;

const Container = styled.div`
  height: 100%;
  scroll-snap-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`;
const Containers = styled.div`
height: 100%;
scroll-snap-align: center;
width: 70%;
display:grid;
justify-content: center;
@media only screen and (min-width: 768px) {
  grid-template-columns: repeat(3, 1fr);
}
`;

const Title = styled.h1`
  font-size: 74px;
  display: flex;
  @media only screen and (max-width: 768px) {
    text-align: center;
  }
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left:30px;
  gap: 20px;
  @media only screen and (max-width: 768px) {
    flex: 1;
    align-items: center;
  }
`;


const HomePage = () => {
  const Navigate = useNavigate();
  const [currUserData, setCurrUserData] = useState({});
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
    else {
      Navigate("/login");
    }
  }, [Navigate]);
  return (
    <div>
    <NavBar/>
    
    <Section>
    <Container>
    <Left>
    <Title style={{color:"white"}}>EA & HAM</Title>
    </Left>
    <Three/>
    </Container>
    <h1 style={{marginBottom:"40px"}}>Technologies We Are Working On</h1>
    </Section>
    <Carousel/>
    <Section>
    <h1 style={{marginBottom:"100px",marginTop:"50px"}}>Upcoming Events</h1>
    <Containers style={{marginBottom:"50px"}} >
    <ECard2/>
    <ECard2/>
    <ECard2/>
    </Containers>
    </Section>
    <Footer/>
    </div>
  );
};

export default HomePage;
