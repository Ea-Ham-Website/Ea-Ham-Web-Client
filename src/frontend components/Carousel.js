import React from "react";
import   "./carousel.css";
import ImgLink1 from "../Gallery/images/technologies/tech1.jpeg"
import ImgLink2 from "../Gallery/images/technologies/tech2.png"
import ImgLink3 from "../Gallery/images/flutter/f1.jpeg"


const Carousel = () => {
  
 
return (
  <div className="carousel-hello">
<div class="carousel-container">
    <input type="radio" name="slider" id="item-1" checked />
    <input type="radio" name="slider" id="item-2" />
    <input type="radio" name="slider" id="item-3" />
  <div class="carousel-cards">
    <label class="carousel-card" for="item-1" id="song-1">
      <img src={ImgLink1} alt="song" />
    </label>
    <label class="carousel-card" for="item-2" id="song-2">
      <img  src={ImgLink2} alt="song" />
    </label>
    <label class="carousel-card" for="item-3" id="song-3">
      <img  src={ImgLink3} alt="song" />
    </label>
  </div>
</div>
  </div>
  
)
};

export default Carousel;
