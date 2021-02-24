import './App.css';
import React,{useState} from 'react';
import PinInputGrid from './PinInputGrid';
import validateInput from './api'
const pin_length = 4;
function App() {
  const [pin, setPin] = useState(new Array(pin_length))
  const [validationResult, setValidationResult] = useState()
  const [validationMessage, setValidationMessage] = useState()
  
  const onPinChanged = (pinEntry, index) => {
    
    
      const newPin = [...pin]
    newPin[index] = pinEntry
    setPin(newPin)
  }

  const validatePin = async () => {
    try {
      const result = await validateInput(pin.join(''))
      console.log(result)
      if(result == "Valid Pin"){
      setValidationResult(true)
      setValidationMessage(result)
      }
      else{
        setValidationMessage(result)
        setValidationResult(false)
      }
    } catch (e) {
      console.log(e)
      
      
    }
  }

  return (
    <div className="App">
      <PinInputGrid validationMessage={validationMessage} validationResult={validationResult}  onPinChanged={onPinChanged} pin={pin} pinLength={pin_length}  />
      
      <button onClick={validatePin}>Validate</button>
      
    </div>
  );
}

export default App;
