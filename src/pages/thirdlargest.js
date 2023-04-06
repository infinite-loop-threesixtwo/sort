import React, { useState } from "react";
import './thirdlargest.css';

function ThirdLargest() {
  const [n, setN] = useState(3);
  const [arr, setArr] = useState([0, 0, 0]);
  const [steps, setSteps] = useState([]);
  const [thirdLargest, setThirdLargest] = useState(null);

  const findThirdLargest = (arr) => {
    // Step 3: Check if the array length is less than 3.
    if (arr.length < 3) {
      return null;
    }
    // Step 1: Sort the array in descending order.
    let sortedArr = arr.sort((a, b) => b - a);
    // Step 2: Remove duplicates.
    sortedArr = sortedArr.filter((value, index, self) => self.indexOf(value) === index);
    if (sortedArr.length < 3){
        return null;
    }
    // If > 3 unique values in the array return the third largest element
    if (sortedArr.length >= 3) {
      return sortedArr[2];
    }
    // If there are less than 3 unique values in the array return the max value
    return sortedArr[0];
  };
  
  function ArrayVisualizer({ arr, steps }) {
    return (
      <div className="array-visualizer">
        <div className="array-container">
          {arr.map((value, i) => (
            <div key={i} className="array-bar" style={{ height: `${value * 10}px` }}>
              {value}
            </div>
          ))}
        </div>
        <div className="steps-container">
          {steps.map((arr, i) => (
            <div key={i} className="step">
              [{arr.join(", ")}]
            </div>
          ))}
        </div>
      </div>
    );
  }
  

  const handleChangeN = (e) => {
    const newN = parseInt(e.target.value);
    if (newN > 3 && newN <= 10) {
      setN(newN);
    }
  };

  const handleChangeArr = (e, i) => {
    const newArr = [...arr];
    newArr[i] = parseInt(e.target.value);
    setArr(newArr);
  };
  const handleClick = () => {
    const sortedArr = [...arr].sort((a, b) => b - a);
    const steps = [];
    steps.push({
      step: 1,
      explanation: `Sort the array ${JSON.stringify(arr)} in descending order using a sorting algorithm. Result: ${JSON.stringify(sortedArr)}`
    });
    const thirdLargest = findThirdLargest(sortedArr);
    steps.push({
      step: 2,
      explanation: `Remove duplicate elements from the sorted array 
      ${JSON.stringify(sortedArr.filter((value, index, self) => self.indexOf(value) === index))}.`
    });
    //steps.push({
      //step: 3,
    //  explanation: `Check if the length of the array is less than 3.`
   // });
    if (thirdLargest !== null) {
      steps.push({
        step: 3,
        explanation: `If the sorted array has 3 or more unique elements, then return the element at index 2 
        (which is the third largest element in the array). ${JSON.stringify(sortedArr)}. Result: ${thirdLargest}`
      });
    } else {
      steps.push({
        step: 3,
        explanation: `There are less than 3 unique elements in the array ${JSON.stringify(arr)}, so we cannot find the third largest element.`
      });
    }
    setSteps(steps);
    setThirdLargest(thirdLargest);
  };
  
  

  const handleReset = () => {
    setArr([0, 0, 0]);
    setSteps([]);
    setThirdLargest(null);
  };

  const handleAdd = () => {
    if (arr.length < 10) {
    setArr([...arr, 0]);
    }
  };

  const handleRemove = (i) => {
    const newArr = [...arr];
    newArr.splice(i, 1);
    setArr(newArr);
  };

  return (
    <div>
      <h1>Third Largest Element</h1>
      <p>Algorithm: 3rd Max in Array: Naive Approach</p>
      <p>Time Complexity: O(n log n) </p>
      <p>Enter the values for the array:</p>
      {arr.map((value, i) => (
        <div key={i}>
          <input type="number" value={value} onChange={(e) => handleChangeArr(e, i)} />
          {i < 3 ? null : <button onClick={() => handleRemove(i)}>-</button>}
        </div>
      ))}
      <button onClick={handleAdd}>+</button>
      <p>
  Steps:
  {steps.map((step) => (
    <div key={step.step}>
      <strong>Step {step.step}:</strong> {step.explanation}
    </div>
  ))}
</p>


      <button onClick={handleClick}>Find Third Largest Element</button>
      <button onClick={handleReset}>Reset</button>
      <p>
        Expected Third Largest Element: {thirdLargest === null ? "-" : thirdLargest}
      </p>
    </div>
  );
}

export default ThirdLargest;
