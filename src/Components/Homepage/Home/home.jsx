import React from 'react';
import './home.css';
import video from '../../../Assets/video1.mp4';

const Home = () => {
  return (
    <section className='home'>
      <div className='overlay'></div>
      <video src={video} muted autoPlay loop type="video/mp4"></video>

      <div className="homeContent container">
        <div className="textDiv">
          <span className='smallText'>
            Welcome to
          </span>

          <h1 className='homeTitle'>
            Our Mystery World! 
          </h1>
          <p class="fancyNote">Discover a world of knowledge, where every book opens a new chapter of adventure and wisdom. Your next great story is waiting.</p>
        </div>
      </div>
    </section>
  );
}

export default Home;


