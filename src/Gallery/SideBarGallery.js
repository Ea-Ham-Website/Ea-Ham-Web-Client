import React from "react";
import styled from "styled-components";

const SideBarGallery = () => {
  return (
    <SidebarContainer>
      <ul>
        <li>
          <a href="#0"> Flutter Workshop </a>
        </li>
        <li>
          <a href="#1"> Game Automation Workshop</a>
        </li>
        <li>
          <a href="#2"> Embedded ML Workshop </a>
        </li>
        <li>
          <a href="#3"> Our Prominent Team </a>
        </li>
      </ul>
    </SidebarContainer>
  );
};

export default SideBarGallery;
const SidebarContainer = styled.div`
  margin-right: 20px;
  position: fixed;
  top: 80px;
  left: 0;
  z-index: 1000;
  padding: 0 1rem;
  width: 15rem;
  font-size: 1.4rem;
  text-transform: uppercase;
  font-family: cursive;
  font-weight: 1500;

  > ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    > li {
      margin: 15px 0;
      list-style: none;

      > a {
        text-decoration: none;
        color: white;

        &:hover {
          color: orange;
        }
      }
    }
  }

  @media (max-width: 700px) {
    display: none;
  }
`;
