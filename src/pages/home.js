import React from 'react';
import './home.css';

function Home() {
    return (
      <div className="menu">
        <span className="text">Algorithm Visualizer</span>
        <a href="bubble">
          <span className="algorithm-choice" key="1" style={{top: '5%'}}>Bubble Sort</span>
        </a>
        <a href="thirdlargest">
          <span className="algorithm-choice" key="2" style={{top: '36%'}}>Third Largest</span>
        </a>
        <a href="merge">
          <div className="algorithm-choice" key="3" style={{top: '67%'}}>Merge Sort</div>
        </a>
      </div>
    );
}

export default Home;