import React, { useState } from 'react';

function SortingVisualizer() {
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
        bars[j].style.backgroundColor = 'red';
        bars[j + 1].style.backgroundColor = 'red';
        await new Promise((resolve) =>
          setTimeout(() => {
            // Debug Print Statements (delete in production)
            console.log(newArray)
            console.log("i " + i + " j " + j)
            console.log("array[i] " + newArray[i] + " array[j] " + newArray[j])
            if (newArray[j] > newArray[j + 1]) {
              // Swap elements
              const temp = newArray[j];
              newArray[j] = newArray[j + 1];
              newArray[j + 1] = temp;
              setArray(newArray);
            }
            
            // Update visuals
            bars[j].style.height = `${newArray[j]/5}px`
            bars[j+1].style.height = `${newArray[j]/5}px`
            bars[j].style.backgroundColor = 'blue';
            bars[j + 1].style.backgroundColor = 'blue';
            resolve();
          }, 1000) // Set speed
        );
      }
    }
  };

  return (
    <div className="visualizer">
      <div className="bars-container">
        {array.map((value, index) => (
          <div
            className="bar"
            key={index}
            // Note to dev: use css file instead of inline?
            // Also, add the value/numbers inside the div
            style={{ height: `${value/5}px`, backgroundColor: 'blue', border: 'solid', width: '50px', display: 'inline-block' }}
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