import React from "react";
import classes from "./footer.module.css";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
function Footer() {
  return (
    <>
      <footer>
        <div className={`${classes["footer-content"]}`}>
          <h3 style={{ backgroundColor: "black" }}>Contact Us</h3>
          <p></p>
          <ul className={classes.socials}>
            <li>
              <SocialIcon url="https://www.instagram.com/the_ea_ham_nitw/" />
            </li>
            <li>
              <SocialIcon url="https://www.linkedin.com/company/ea-ham-club-nitw/"></SocialIcon>
            </li>
          </ul>
        </div>
        <div className={`${classes["footer-bottom"]}`}>
          <div className={`${classes["footer-menu"]}`}>
            {/* <ul className={`${classes["f-menu"]}`}>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/events">Event</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/team">Team</Link>
              </li>
            </ul> */}
          </div>
          <p>
            copyright &copy; <a href="#">EA HAM</a>{" "}
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
