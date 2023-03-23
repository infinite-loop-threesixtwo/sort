import React from 'react';
import './home.css';

function Home() {
    return (
      <div className="menu">
        <a href="bubble">
          <span className="algorithm-choice" key="1">Bubble Sort</span>
        </a>
        <div className="algorithm-choice" key="2" style={{left: '33%'}}></div>
        <div className="algorithm-choice" key="3" style={{left: '66%'}}></div>
      </div>
    );
}

export default Home;