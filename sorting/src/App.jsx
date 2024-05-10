import { useState } from 'react';
import './App.css';
import { Slider } from '@mui/material';

function App() {
  const [val, setVal] = useState(null); // Initial value set to null
  const [array, setArray] = useState([]);

  const updateRange = (e, data) => {
    setVal(data);
    generateArray(data);
  };

  const generateArray = (length) => {
    const newArray = Array.from({ length }, () => Math.floor(Math.random() * 1000) + 1);
    setArray(newArray);
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (e.target.value === "" || (!isNaN(newValue) && newValue >= 1 && newValue <= 100)) {
      setVal(newValue === "" ? null : newValue);
      generateArray(newValue === "" ? null : newValue);
    }
  };

  const bubbleSort = async () => {
    let newArray = [...array]; // Make a copy of the array
    let swapped;
    do {
      swapped = false;
      for (let i = 0; i < newArray.length - 1; i++) {
        if (newArray[i] > newArray[i + 1]) {
          let temp = newArray[i];
          await swapDelay(newArray);
          setArray(prevArray => [...newArray]);// Update the state with the sorted array
          newArray[i] = newArray[i + 1];
          newArray[i + 1] = temp;
          swapped = true;
        }
      }
      
    } while (swapped);
  };
  const swapDelay = (newArray) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 0); // Adjust the delay as needed
    });
  };
  function heapify(arr, N, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < N && arr[l] > arr[largest])
        largest = l;

    if (r < N && arr[r] > arr[largest])
        largest = r;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]]; // swap
        heapify(arr, N, largest);
    }
  }
  
  async function heapSort(arr, N) {
    for (let i = Math.floor(N / 2) - 1; i >= 0; i--)
      heapify(arr, N, i);
    
    for (let i = N - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]]; // swap
      await swapDelay(newArray);
      heapify(arr, i, 0);
    }
    setArray(prevArray => [...arr]);// Update the state with the sorted array
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function mergeSort(arr, setArray, delay) {
  if (arr.length <= 1) {
      return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(
      mergeSort(left, setArray, delay),
      mergeSort(right, setArray, delay),
      setArray,
      delay
  );
}

function merge(left, right, setArray, delay) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
      } else {
          result.push(right[rightIndex]);
          rightIndex++;
      }
  }

  const mergedArray = result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  setArray(mergedArray);
  return mergedArray;
}
function quickSort(arr, setArray, delay) {
  if (arr.length <= 1) {
      return arr;
  }

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] < pivot) {
          left.push(arr[i]);
      } else {
          right.push(arr[i]);
      }
  }

  const sortedLeft = quickSort(left, setArray, delay);
  const sortedRight = quickSort(right, setArray, delay);
  const sortedArray = [...sortedLeft, pivot, ...sortedRight];
  setArray(sortedArray);
  return sortedArray;
}



  return (
    <>
      <div className='topbar'>
        <div className='sort'>

        <div className="Bubble sort" onClick={bubbleSort}>Bubble sort</div>
        <div className="merge sort" onClick={() => mergeSort(array, setArray,10)}>Merge sort</div>
        <div className="quick sort" onClick={() => quickSort(array, setArray, 10)}>Quick sort</div>
        <div className="heap sort"  onClick={() => heapSort(array, array.length)}>Heap sort</div>
        </div>
      </div>
      <div className="generate array">
        <div className="array">
          Generate array of length:-
        </div>
        <input 
          type="number" 
          max={100} 
          min={1} 
          value={val === null ? "" : val} 
          onChange={handleInputChange}
        />
        <div className='slider'>
          <Slider 
            value={val === null ? 50 : val} // Set a default value if val is null
            onChange={updateRange}
            min={1}
            max={100}
          />
        </div>
      </div>
      <div className="array-display">
        {array.map((value, index) => (
          <div 
            className="bar" 
            key={index}
            style={{
              height: `${(value / 1000) * 500}px`, // Adjusting height based on value
              width: `${100 / array.length}%`,
            }}
          ></div>
        ))}
      </div>
    </>
  );
}

export default App;
