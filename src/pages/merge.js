import React, { useState, useEffect } from 'react';
import './merge.css';

function Merge() {
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
  
  // Click handler, so we can pass array
  const handleMergeSort = async () => {
    const sortedArray = await mergeSort(array);
    setArray(sortedArray);
  };
  
  // Merge Sort Algorithm
  const mergeSort = async (array) => {
    const len = array.length;
    if (len <= 1) {
      return array; // base case
    }
    const mid = Math.floor(len / 2);
    const leftArray = array.slice(0, mid);
    const rightArray = array.slice(mid);
    const sortedLeftArray = await mergeSort(leftArray);
    const sortedRightArray = await mergeSort(rightArray);
    return merge(sortedLeftArray, sortedRightArray);
  };

  
  const merge = async (left, right) => {
    const resultArray = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      const bars = document.getElementsByClassName("bar");

      await new Promise((resolve) =>
        setTimeout(() => {
          if (left[leftIndex] < right[rightIndex]) {
            resultArray.push(left[leftIndex]);
            leftIndex++;
          } else {
            resultArray.push(right[rightIndex]);
            rightIndex++;
            
          }
          for (let i = 0; i != leftIndex+rightIndex+1; i++) {
            bars[i].style.backgroundColor = '#001F54';
          }
          setArray(resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex)));
          resolve();
        }, 1000) // Set speed
      );
    }

    // Concatenate any remaining elements from left and right into the result array
    return resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };


  return (
    <div className="visualizer">
      <div className="title">Merge Sort</div>
      <div className="description">
        Merge sort is an efficient, general-purpose, and comparison-based sorting algorithm. It works on the principle of dividing the array into many halves and merging them in a sorted manner. <br></br>
        <b>Time complexity: O(N log N)</b>
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
        <button onClick={handleMergeSort}>Merge Sort</button>
      </div>
    </div>
  );
}

export default Merge;

// Generate array on start instead of waiting for button?