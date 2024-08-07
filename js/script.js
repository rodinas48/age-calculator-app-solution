const calc_btn = document.getElementById("calc");
const inputs = document.querySelectorAll(".input");
const outputs = document.querySelectorAll(".output");
const error_msg = document.querySelectorAll(".error-msg");
const labels = document.querySelectorAll(".label");

let day_input;
let month_input;
let year_input;

let validDays;
let validMonths;
let validYears;

const calcAge = function (e) {
  e.preventDefault();
  day_input = Number(inputs[0].value);
  month_input = Number(inputs[1].value);
  year_input = Number(inputs[2].value);
  console.log(day_input, month_input, year_input);
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === "") {
      labels[i].style.cssText = " color: hsl(0, 100%, 67%);";
      inputs[i].style.cssText = "border-color:hsl(0, 100%, 67%);";
      error_msg[i].innerHTML = " This field is required";
    } else {
      labels[i].style.cssText = "";
      inputs[i].style.cssText = "";
      error_msg[i].innerHTML = "";
    }
  }

  if (!checkDateValidation()) return;
 calculation();
};
function calculation() {
  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  let calcDay, calcMonth, calcYear;

  calcYear = year - year_input;

  if (month >= month_input) {
    calcMonth = month - month_input;
  } else {
    calcYear--;
    calcMonth = 12 + month - month_input;
  }
  if (day >= day_input) {
    calcDay = day - day_input;
  } else {
    calcMonth--;
    calcDay = validDays + day - day_input;
  }
  outputs[0].innerHTML = calcYear;
  outputs[1].innerHTML = calcMonth;
  outputs[2].innerHTML = calcDay;
  console.log(calcDay, calcMonth, calcYear);
}
function checkDateValidation() {
  let isValid = true;
  validDays = new Date(year_input, month_input, 0).getDate();
  validMonths = 12;
  validYears = new Date().getFullYear();

    const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  if (day_input < 1 || day_input > validDays) {
    inputs[0].style.cssText = "border-color:hsl(0, 100%, 67%);";
    labels[0].style.cssText = "color: hsl(0, 100%, 67%);";
    error_msg[0].innerHTML = "Must be a valid day ";
    isValid = false;
  }
  if (month_input < 1 || month_input > validMonths) {
    inputs[1].style.cssText = "border-color:hsl(0, 100%, 67%);";
    labels[1].style.cssText = "color: hsl(0, 100%, 67%);";
    error_msg[1].innerHTML = "Must be a valid month ";
    isValid= false;
  }
  if (year_input < 1 || year_input > validYears) {
    inputs[2].style.cssText = "border-color:hsl(0, 100%, 67%);";
    labels[2].style.cssText = "color: hsl(0, 100%, 67%);";
    error_msg[2].innerHTML = "Must be in the past";
    isValid = false;
  }
 if (year_input === todayYear && month_input > todayMonth) {
   inputs[1].style.cssText = "border-color:hsl(0, 100%, 67%);";
   labels[1].style.cssText = "color: hsl(0, 100%, 67%);";
   error_msg[1].innerHTML = "Must be in the past or present month";
   isValid = false; // Return false if month is in the future for the current year
  }
  if (month_input === todayMonth && day_input > todayDay) {
    inputs[1].style.cssText = "border-color:hsl(0, 100%, 67%);";
    labels[1].style.cssText = "color: hsl(0, 100%, 67%);";
    error_msg[1].innerHTML = "Must be in the past or present month";
    isValid = false; 
  }
  return isValid;
}
calc_btn.addEventListener("click", calcAge);
