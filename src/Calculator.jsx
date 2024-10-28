import './App.css';
import { useState } from 'react';

function App() {
  const [input, setInput] = useState();
  const [currentValue, setCurrentValue] = useState(0);
  const [previousValue, setPreviousValue] = useState(0);
  const [currentOperator, setCurrentOperator] = useState(null);

  // Display Number
 
  const handleDisplayNumber = (e) => {
    const number = e.target.innerText;

    if (number === '.' && String(currentValue).includes('.')) {
      return;
    }

    setCurrentValue((prev) => (prev === 0 ? number : prev + number));
    setInput(currentValue === 0 ? number : currentValue + number);
  };

//  Handle operator
  const handleOperator = (e) => {
    const operatorText = e.target.innerText;
    setCurrentOperator(operatorText);

    if (previousValue !== 0 && currentOperator && currentValue !== 0) {
      calculateResult();
    } else if (currentValue !== 0) {
      setPreviousValue(currentValue);
      setCurrentValue(0);
    }
  };

  // Toggle Positive/Negative
  const togglePositiveNegative = () => {
    if (currentOperator === null) {
      setCurrentValue(-currentValue);
      setInput(-input);
    } else if (previousValue !== 0) {
      setCurrentValue(-currentValue);
      setInput(-input);
    } else if (currentValue === 0) {
      setPreviousValue(-previousValue);
      setInput(-previousValue);
    }
  };

  // Calculate Percentage
  const calculatePercentage = () => {
    const newInput = input / 100;
    setCurrentValue(newInput);
    setPreviousValue(currentOperator !== null ? previousValue : newInput);
    setInput(newInput);
  };

  // Calculate Result
  const calculateResult = () => {
    const prevNum = (previousValue);
    const curNum =(currentValue);
    let result;

    switch (currentOperator) {
      case '/':
        if (curNum === 0) {
          return;
        }
        result = prevNum / curNum;
        break;
      case 'X':
        result = prevNum * curNum;
        break;
      case '-':
        result = prevNum - curNum;
        break;
      case '+':
        result = prevNum + curNum;
        break;
      default:
        return;
    }

    setCurrentValue(0);
    setPreviousValue(result);
    setInput(result);
  };

  //Reset Calculator
  const resetCalculator = () => {
    setCurrentValue(0);
    setPreviousValue(0);
    setInput(0);
    setCurrentOperator(null);
  };

  return (
    <div className="container">
      <div className="wrap">
        <div className="outputScreen">
          <span className="output">{input}</span>
        </div>
        
        <div className="btn" onClick={resetCalculator}>AC</div>
        <div className="btn" onClick={togglePositiveNegative}>+/-</div>
        <div className="btn" onClick={calculatePercentage}>%</div>
        <div className="btn orange" onClick={handleOperator}>/</div>

        <div className="btn num" onClick={handleDisplayNumber}>7</div>
        <div className="btn num" onClick={handleDisplayNumber}>8</div>
        <div className="btn num" onClick={handleDisplayNumber}>9</div>
        <div className="btn orange" onClick={handleOperator}>X</div>

        <div className="btn num" onClick={handleDisplayNumber}>4</div>
        <div className="btn num" onClick={handleDisplayNumber}>5</div>
        <div className="btn num" onClick={handleDisplayNumber}>6</div>
        <div className="btn orange" onClick={handleOperator}>-</div>

        <div className="btn num" onClick={handleDisplayNumber}>1</div>
        <div className="btn num" onClick={handleDisplayNumber}>2</div>
        <div className="btn num" onClick={handleDisplayNumber}>3</div>
        <div className="btn orange" onClick={handleOperator}>+</div>

        <div className="btn zero num" onClick={handleDisplayNumber}>0</div>
        <div className="btn num" onClick={handleDisplayNumber}>.</div>
        <div className="btn orange" onClick={calculateResult}>=</div>
      </div>
    </div>
  );
  }

export default App;