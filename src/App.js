import React, { useState, useEffect } from 'react';
import './App.css';

function SortingVisualizer() {
  //This is hacky since it calls the if statement constantly but it works
  useEffect(() => {
        if(!document.getElementsByClassName('bar').length) generateArray();
     });
  const [array, setArray] = useState([]);

  // Generate random array
  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < 10; i++) {
      newArray.push(Math.floor(Math.random() * 500) + 10); // Random number between 10-500
    }
    setArray(newArray);
  };

  // Bubble Sort Algorithm
  const bubbleSort = async () => {
    const len = array.length;
    const newArray = [...array];
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        const bars = document.getElementsByClassName('bar');
        bars[j].style.backgroundColor = '#001F54';
        bars[j + 1].style.backgroundColor = '#001F54';
        await new Promise((resolve) =>
          setTimeout(() => {
            if (newArray[j] > newArray[j + 1]) {
              // Swap elements
              const temp = newArray[j];
              newArray[j] = newArray[j + 1];
              newArray[j + 1] = temp;
              bars[j].style.height = `${newArray[j]/5}px`;
              bars[j+1].style.height = `${newArray[j+1]/5}px`;
            }
            // Update visuals
            bars[j].style.backgroundColor = '#1282A2';
            bars[j + 1].style.backgroundColor = '#1282A2';
            resolve();
          }, 1000) // Set speed
        );
      }
    }
  };

  return (

    <div className="visualizer">
      <div className="title">
        Bubble Sort
      </div>
      <div className="description">
        Bubble sort is a simple algorithm that repeatedly compares adjacent elements in a list and swaps them if they are in the wrong order until the list is in order <br></br><b>Time complexity: O(N^2)</b>
      </div>
      <div className="bars-container">
        {array.map((value, index) => (
          <div
            className="bar"
            key={index}
            // Note to dev: use css file instead of inline?
            // Also, add the value/numbers inside the div
            style={{ height: `${value/5}px`, backgroundColor: '#1282A2', border: 'solid', width: '50px', display: 'inline-block' }}
          ></div>
        ))}
      </div>
      <div className="buttons">
        <button onClick={generateArray}>Generate Array</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
      </div>
    </div>
  );
}

export default SortingVisualizer;

// Generate array on start instead of waiting for button?