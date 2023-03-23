import React, { useState, useEffect } from 'react';
import './bubble.css';

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

  const handleArrayChange = (event) => {
    const inputArray = event.target.value.split(',').map(Number);
    setArray(inputArray);
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
              const tempHeight = bars[j].style.height;
              bars[j].style.height = bars[j+1].style.height;
              bars[j+1].style.height = tempHeight;
              const tempInner = bars[j].innerHTML;
              bars[j].innerHTML = bars[j+1].innerHTML;
              bars[j+1].innerHTML = tempInner;
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
      <div className="title">Bubble Sort</div>
      <div className="description">
        Bubble sort is a simple algorithm that repeatedly compares adjacent elements in a list and swaps them if they are in the wrong order until the list is in order <br></br>
        <b>Time complexity: O(N^2)</b>
      </div>
      <div className="bars-container">
        {array.map((value, index) => (
          <div
            className="bar"
            key={index}
            // Also, add the value/numbers inside the div
            style={{ height: `${value/10}vh`, fontsize: `${value/25}vh`, }}
          >{value}</div>
        ))}
      </div>
      <div className="buttons">
        <label htmlFor="arrayInput" className="label-input">Input Array:</label>
        <input type="text" id="arrayInput" onChange={handleArrayChange} />
        <button onClick={generateArray}>Generate Array</button>
        <button onClick={bubbleSort}>Bubble Sort</button>
      </div>
    </div>
  );
}

export default SortingVisualizer;

// Generate array on start instead of waiting for button?