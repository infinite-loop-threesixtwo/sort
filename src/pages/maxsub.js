import React, { useState } from 'react';

function MaxContiguousSubarray() {
  const [array, setArray] = useState([]);
  const [result, setResult] = useState([]);
  const [useNaive, setUseNaive] = useState(false);
  const [timeTaken, setTimeTaken] = useState(null);

  const handleToggle = () => {
    setUseNaive(!useNaive);
  };
  
  const handleArrayChange = (event) => {
    const inputArray = event.target.value.split(',').map(Number);
    setArray(inputArray);
    setResult([]);
  };
  
  const RenderSubArray = (i,j) => {
    const numbers = array.slice(i,j+1);
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

  const findMaxContiguousSubarrayNaive = async () => {
    const startTime = performance.now();
    let maxSum = -Infinity;
    let maxStart = 0;
    let maxEnd = 0;
    const len = array.length;

    for (let i = 0; i < len; i++) {
      let currentSum = 0;
      for (let j = i; j < len; j++) {
        currentSum += array[j];
        // update maxSum and indices if currentSum is greater
        if (currentSum > maxSum) {
          maxSum = currentSum;
          maxStart = i;
          maxEnd = j;
        }
        
        // show currentSum and maxSum at each iteration (using promises to maintain current max sum order)
        // eslint-disable-next-line
        await new Promise((resolve) => {
          setResult(prevResult => [...prevResult, { i, j, currentSum, maxSum }]);
          resolve();
        });
      }
    }
    setResult(prevResult => [...prevResult, { done: true, maxSum, maxStart, maxEnd }]);
    const endTime = performance.now();
    setTimeTaken((endTime - startTime).toFixed(4));
  };

  const findMaxContiguousSubarrayKadane = async () => {
    const startTime = performance.now();
    let maxSum = -Infinity;
    let maxStart = 0;
    let maxEnd = 0;
    let currentSum = 0;
    let i = 0;
    const len = array.length;

    for (let j = 0; j < len; j++) {
      currentSum += array[j];

      // update currentSum and i if currentSum becomes negative
      if (currentSum < 0) {
        currentSum = 0;
        i = j + 1;
      }

      // update maxSum and indices if currentSum is greater
      if (currentSum > maxSum) {
        maxSum = currentSum;
        maxStart = i;
        maxEnd = j;
      }
      
      // show currentSum and maxSum at each iteration (using promises to maintain current max sum order)
      // eslint-disable-next-line
      await new Promise((resolve) => {
        setResult(prevResult => [...prevResult, { i, j, currentSum, maxSum }]);
        resolve();
      });
    }
    setResult(prevResult => [...prevResult, { done: true, maxSum, maxStart, maxEnd }]);
    const endTime = performance.now();
    setTimeTaken((endTime - startTime).toFixed(4));
  };

  return (
    <div className="max-contiguous-subarray">
      <div className="title">Maximum Contiguous Subarray</div>
      <div className="description">
        <p>Given an array of integers, find the contiguous subarray with the largest sum.</p>
        <p>Algorithm: {useNaive ? "Naive" : "Kadane's"}</p>
        <p>Time complexity: {useNaive ? "O(n^2)" : "O(n)"}</p>
        <p>Run Time: {timeTaken * 1000} μs </p>
      </div>
      <div className="buttons">
        <div className="array-input">
          <label htmlFor="arrayInput">Input Array:</label>
          <input type="text" id="arrayInput" onChange={handleArrayChange} />
        </div>
        <button onClick={useNaive ? findMaxContiguousSubarrayNaive : findMaxContiguousSubarrayKadane}>Find Max Contiguous Subarray</button>
        <button onClick={handleToggle}>{useNaive ? "Use Kadane's Algorithm" : "Use Naive Algorithm"}</button>
      </div>
      <p></p>
      <div className="result">
        {result.map((step, index) => (
          <div key={index}>
            {step.done ? (
              <div>
                <b>Max Sum:</b> {step.maxSum}<br />
                <b>Max Sub-Array:</b> {RenderSubArray(step.maxStart,step.maxEnd)}<br />
              </div>
            ) : (
              <div>
                <b>Sub-Array:</b> {RenderSubArray(step.i,step.j)}<br />
                <b>Subarray Sum:</b> {step.currentSum}<br />
                <b>Current Max Sum:</b> {step.maxSum}<br />
              </div>
            )}
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MaxContiguousSubarray;
