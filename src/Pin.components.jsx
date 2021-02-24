import styled from 'styled-components';
export const StyledPinInput = styled.input`
  width: 35px;
  height: 35px;
  border: 2px solid;
  font-size: 12px;
  text-align: center;
  margin: 8px;
  font-family: 'dotsfont';
  border-color: ${props => {
    switch (props.isCorrect) {
      case true:
        return 'green'
      case false:
        return 'red'
      default: 
      return '#c3c3c3';
    }
  } }
`;
export const ValidationResultParagraph = styled.p`
  color: ${props => props.isCorrect ? 'green' : 'red'}
`;

