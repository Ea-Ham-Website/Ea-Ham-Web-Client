import React, { useState } from 'react';
import classes from  './eCard.module.css';
import { Link } from 'react-router-dom';
const Card = () => {
  return (
    <div className={classes.cardBox}>
  <div className={classes.card}>
    <h2>Event</h2>
    <span>Date</span>
    <div className={classes.content}>
      <p>This is Ankan, your tech mate!!! I love you all. Lets make this world a better place for all of us. Keep prospering...Keep learning!!!</p>
        <Link to="/events">Register Now</Link>
    </div>
  </div>
</div>
  );
};

export default Card;