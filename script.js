"use strict";
/*
//TERNARY OPERATOR. SMALL CODE SO THIS IS BEST CHOICE AND NOT IF/ELSE.
//EASY WAY
const bill = 275;
const tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(
  `the bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`
);
*/

// Select elements from html
// container
const tipCalc = document.querySelector(".container");

//inputs
const allInputs = document.querySelectorAll(".input");
const billInput = document.querySelector(".bill__input");
const customInput = document.querySelector(".tips__input");
const peopleInput = document.querySelector(".people__input");

//labels
const labelPeopleError = document.querySelector(".people__error");

//buttons
const tipsBtns = document.querySelectorAll(".btn__tips");
const tipsBtnActive = document.querySelector(".btn__tips:nth-child(3)");
const resetBtn = document.querySelector(".btn--main");

//results
const resultsValue = document.querySelectorAll(".value");
const tipPerPersonValue = document.querySelector(".tip-out__value");
const totalPerPersonValue = document.querySelector(".total__value");

//defaults
let peopleValue;
let billValue;
let customValue;
let tips = 0.15;

//functions

//convert input str in to number
const billInpVal = function () {
  billInput.classList.add("main-outline");
  billValue = Number(billInput.value);
  calcTip();
};

const peopleInpVal = function () {
  peopleValue = Number(peopleInput.value);

  if (peopleValue < 1 && peopleInput.value !== "") {
    labelPeopleError.classList.remove("hidden");
    peopleInput.classList.remove("main-outline");
    peopleInput.classList.add("error-input-outline");
  } else {
    labelPeopleError.classList.add("hidden");
    peopleInput.classList.remove("error-input-outline");
    peopleInput.classList.add("main-outline");
    calcTip();
  }
};

const customInpVal = function () {
  customInput.classList.add("main-outline");
  tips = parseFloat(customInput.value / 100);

  tipsBtns.forEach((el) => {
    el.classList.remove("active");
  });

  calcTip();
};

const tipsPercent = function (event) {
  tipsBtns.forEach((el) => {
    el.classList.remove("active");
    if (event.target.innerHTML === el.innerHTML) {
      el.classList.add("active");
      tips = parseFloat(el.innerHTML) / 100;
    }
  });

  calcTip();
};

const calcTip = function () {
  if (peopleValue >= 1) {
    const tipFinal = (billValue * tips) / peopleValue;
    const totalFinal = (billValue + tipFinal) / peopleValue;

    tipPerPersonValue.innerHTML = `$${tipFinal.toFixed(2)}`;
    totalPerPersonValue.innerHTML = `$${totalFinal.toFixed(2)}`;
  }
};

const reset = function () {
  billInput.value = 0;
  billInpVal();
  peopleInput.value = 0;
  peopleInpVal();
  customInput.value = "";

  billInput.style.opacity = "0.3";
  peopleInput.style.opacity = "0.3";
  billInput.classList.remove("main-outline");
  customInput.classList.remove("main-outline");
  labelPeopleError.classList.add("hidden");
  peopleInput.classList.remove("main-outline");
  peopleInput.classList.remove("error-input-outline");

  tipPerPersonValue.innerHTML = `$${(0.0).toFixed(2)}`;
  totalPerPersonValue.innerHTML = `$${(0.0).toFixed(2)}`;
  resetBtn.classList.add("inactive-btn");
  tipsBtns.forEach((btn) => {
    btn.classList.remove("active");
  });
};

//event listeners
billInput.addEventListener("input", billInpVal);
peopleInput.addEventListener("input", peopleInpVal);
customInput.addEventListener("input", customInpVal);
tipsBtns.forEach((btn) => {
  btn.addEventListener("click", tipsPercent);
});
resetBtn.addEventListener("click", reset);
