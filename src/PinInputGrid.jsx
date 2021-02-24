import React,{useRef} from 'react'
import {StyledPinInput, ValidationResultParagraph} from './Pin.components'

const PinInputGrid = ({pinLength, pin, onPinChanged, validationResult, validationMessage}) => {
    const PIN_MIN_VALUE = 0;
    const PIN_MAX_VALUE = 9;
    const BACKSPACE_KEY = 'Backspace';

    const inputRefs = useRef([])

  const changePinFocus = (pinIndex) => {
    const ref = inputRefs.current[pinIndex]
    if(ref) {
      ref.focus()
    }
  }


  const onChange = (event, index) => {
    const previousValue = event.target.defaultValue; 
    const valuesArray  = event.target.value.split('');
    removeValuesFromArray(valuesArray, previousValue)
    const value = valuesArray.pop()
    if(!value) {
      return;
    }
    const pinNumber = Number(value.trim());
    if(isNaN(pinNumber) || value.length === 0) {
      return 
    }
    
    if(pinNumber >= PIN_MIN_VALUE && pinNumber <= PIN_MAX_VALUE) {
      
      onPinChanged(pinNumber, index)
      if(index < pinLength - 1) {
        changePinFocus(index + 1)
      }
    
    }
  }

  const onKeyDown = (event, index) => {
    const keyboardKeyCode = event.nativeEvent.code;
    if(keyboardKeyCode !== BACKSPACE_KEY) {
      return
    }

    if(pin[index] === undefined) {
      changePinFocus(index - 1)
    } else {
      onPinChanged(undefined, index)
    }
  }


  const removeValuesFromArray = (valuesArray, value) => {

    const valueIndex = valuesArray.findIndex(entry => entry === value)
    if(valueIndex === -1) {
      return
    }
    valuesArray.splice(valueIndex, 1)
  }


    return (
        <>
    <div>{
      Array.from({length: pinLength}, (_,index ) => (
        <StyledPinInput
          isCorrect= {validationResult}
          onKeyDown={(event) => onKeyDown(event, index)}
          key={index}
          ref={el => {
          if(el) {
            inputRefs.current[index] = el;
          }
        }} onChange={(event) => onChange(event, index)} value={pin[index] || ''}/>
      ) )
    }
    
    <ValidationResultParagraph isCorrect={validationResult}>{validationMessage}</ValidationResultParagraph>
    
    </div>
      </>
    )
}

export default PinInputGrid
