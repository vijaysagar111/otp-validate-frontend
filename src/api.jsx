import axios from 'axios';



const  validateInput = (pinToCheck) => axios.get('https://otp-validation.herokuapp.com/verify-number').then((res) => {
const num = res.data[0].number;
if(pinToCheck == num){
  return "Valid Pin"
}
else{
  return "Invalid Pin"
}
} )

export default validateInput