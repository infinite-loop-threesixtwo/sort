import React, { useState } from "react";

function ThirdLargest() {
  const [arr, setArr] = useState([0, 0, 0]);
  const [steps, setSteps] = useState([]);
  const [thirdLargest_, setThirdLargest] = useState(null);
  const [thirdLargestNaive, setThirdLargestNaive] = useState(null);
  const [useNaive, setUseNaive] = useState(false);

  const findThirdLargest = (arr) => {
    let first = null, second = null, third = null;
    for (let i = 0; i < arr.length; i++) { //iterate array 
      if (first === null || arr[i] > first) { // If the current element > first largest element, update the first, second, and third

        third = second;
        second = first;
        first = arr[i];
      } else if (second === null || arr[i] > second) { // If the current element <  first largest element, but is  > second largest element, update the second and third largest 

        third = second;
        second = arr[i];
      } else if (third === null || arr[i] > third) {  // If the current element  < larger than  first || second largest element, but  > third largest element, update third largest

        third = arr[i];
      }
    }
    return third !== null ? third : first; // If the third largest element found, return ; else, return the first largest

  }

  const findThirdLargestNaive = (arr) => {
    // Check if the array length is less than 3.
    if (arr.length < 3) {
      return null;
    }
    // Sort the array in descending order.
    let sortedArr = arr.sort((a, b) => b - a);
    // Remove duplicates.
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

  const handleChangeArr = (e, i) => {
    const newArr = [...arr];
    newArr[i] = parseInt(e.target.value);
    setArr(newArr);
  };


  const handleClick = () => {
    const sortedArr = [...arr].sort((a, b) => b - a);
    let currentStep = 1;
    const steps = [];
  
    if (useNaive) {
      steps.push({
        step: currentStep++,
        explanation: `Sort the array ${JSON.stringify(arr)} in descending order using a sorting algorithm. Result: ${JSON.stringify(sortedArr)}`
      });
  
      const thirdLargestNaive = findThirdLargestNaive(sortedArr);
      steps.push({
        step: currentStep++,
        explanation: `Remove duplicate elements from the sorted array ${JSON.stringify(sortedArr.filter((value, index, self) => self.indexOf(value) === index))}.`
      });
  
      if (thirdLargestNaive !== null) {
        steps.push({
          step: currentStep++,
          explanation: `If the sorted array has 3 or more unique elements, then return the element at index 2 (which is the third largest element in the array). ${JSON.stringify(sortedArr)}. Result: ${thirdLargestNaive}`
        });
      } else {
        steps.push({
          step: currentStep++,
          explanation: `There are less than 3 unique elements in the array ${JSON.stringify(arr)}, so we cannot find the third largest element.`
        });
      }
  
      setSteps(steps);
      setThirdLargestNaive(thirdLargestNaive);
  
    } else {

      const thirdLargest_ = findThirdLargest(arr);

      steps.push({
        step: currentStep++,
        explanation: `Initialize the first, second, and third largest elements to null.`
      });
  
      let firstLargest = null;
      let secondLargest = null;
      let thirdLargest = null;
  
      arr.forEach((element) => {
        steps.push({
          step: currentStep++,
          explanation: `Check if ${element} is greater than the first largest element (${firstLargest}.)`
        });
  
        if (element > firstLargest) {
          steps.push({
            step: currentStep++,
            explanation: `Update the first, second, and third largest elements to ${element}, ${firstLargest}, and ${secondLargest}.`
          });
  
          thirdLargest = secondLargest;
          secondLargest = firstLargest;
          firstLargest = element;
  
        } else if (element > secondLargest || secondLargest === null) {
          steps.push({
            step: currentStep++,
            explanation: `Update the second and third largest elements to ${element} and ${secondLargest}.`
          });
  
          thirdLargest = secondLargest;
          secondLargest = element;
  
        } else if (element > thirdLargest || thirdLargest === null) {
          steps.push({
            step: currentStep++,
            explanation: `Update the third largest element to ${element}.`
          });
  
          thirdLargest = element;
        }
      });
  
      if (thirdLargest !== null) {
        steps.push({
          step: currentStep++,
          explanation: `The third largest element in the array ${JSON.stringify(arr)} is ${thirdLargest}.`
        });
      } else {
        steps.push({
          step: currentStep++,
          explanation: `There are less than 3 unique elements in the array ${JSON.stringify(arr)}, so we cannot find the third largest element.`
        });
      }
  
      setSteps(steps);
      setThirdLargest(thirdLargest_);
    }
  };
  
  

  const handleToggle = () => {
    setUseNaive(!useNaive);
    
  };


  const handleReset = () => {
    setArr([0, 0, 0]);
    setSteps([]);
    setThirdLargestNaive(null);
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
      <div className="title">Third Largest Element</div>
      <p>Algorithm: 3rd Max in Array: {useNaive ? "Naive" : "Good Approach"}</p>
      <p>Time Complexity: {useNaive ? "O(n log n)" : "O(n)"}</p> 
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

<p>
        Expected Third Largest Element: {useNaive ? thirdLargestNaive : thirdLargest_ }
        
      </p>
      <button onClick={handleClick}>Find Third Largest Element</button>
      <button onClick={handleToggle}>{useNaive ? "Use Efficient Algorithm" : "Use Naive Algorithm"}</button>
      <button onClick={handleReset}>Reset</button>
     
    </div>
  );
}

export default ThirdLargest;
