import React, { useState } from 'react';

function MaxContiguousSubarray() {
  const [array, setArray] = useState([]);
  const [result, setResult] = useState([]);

  const handleArrayChange = (event) => {
    const inputArray = event.target.value.split(',').map(Number);
    setArray(inputArray);
    setResult([]);
  };
  
  const RenderSubArray = (i,j) => {
    const numbers = array.slice(i,j+1);
    console.log(numbers);
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    return (
      <ul>{listItems}</ul>
    );
  }

  const findMaxContiguousSubarray = async () => {
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
        await new Promise((resolve) => {
          setResult(prevResult => [...prevResult, { i, j, currentSum, maxSum }]);
          resolve();
        });
      }
    }
    setResult(prevResult => [...prevResult, { done: true, maxSum, maxStart, maxEnd }]);
  };

  return (
    <div className="max-contiguous-subarray">
      <div className="title">Maximum Contiguous Subarray</div>
      <div className="description">
        Given an array of integers, find the contiguous subarray with the largest sum.<br />
        Time complexity: O(n^2)
      </div>
      <div className="buttons">
        <div className="array-input">
          <label htmlFor="arrayInput">Input Array:</label>
          <input type="text" id="arrayInput" onChange={handleArrayChange} />
        </div>
        <button onClick={findMaxContiguousSubarray}>Find Max Contiguous Subarray</button>
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
