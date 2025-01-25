const BASE_URL="https://api.exchangerate-api.com/v4/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns) {
  for(currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "Selected";
    } else if (select.name === "To" && currCode === "INR") {
      newOption.selected = "Selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target); //target is used for basically to update a change (updateFlag).
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  console.log(currCode);
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};


btn.addEventListener("click", async (evt) => {
  evt.preventDefault(); //by using this screen dont refresh all time when we click on exchange rate button.
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  } 

  let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data.rates);
    let rate = data.rates[toCurr.value.toUpperCase()];
    console.log(rate);
    let finalAmount = amtVal * rate;
    console.log(finalAmount);
    msg.innerText = `${amtVal} ${fromCurr.value} =  ${finalAmount} ${toCurr.value}`;
});
