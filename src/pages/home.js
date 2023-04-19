import React from 'react';

function Home() {
    return (
      <div className="menu">
        <span className="text">Algorithm Visualizer</span>
        <a href="bubble">
          <span className="algorithm-choice" key="1" style={{top: '5%'}}>Bubble Sort</span>
        </a>
        <a href="thirdlargest">
          <span className="algorithm-choice" key="2" style={{top: '28%'}}>Third Largest</span>
        </a>
        <a href="merge">
          <div className="algorithm-choice" key="3" style={{top: '51%'}}>Merge Sort</div>
        </a>
        <a href="maxsub">
          <div className="algorithm-choice" key="4" style={{top: '74%'}}>Max Subarray</div>
        </a>
      </div>
    );
}

export default Home;