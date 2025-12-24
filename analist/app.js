let calc = document.getElementById("calc");
calc.addEventListener("click", calculate);

let calcActivation = document.getElementById("calcActivation");
calcActivation.addEventListener("click", calculateActivation);

function calculate (){
    let entry = document.getElementById("entry");
    let amount = document.getElementById("amount");
    let callback = document.getElementById("callback");    
    let activation = document.getElementById("activation");
    let stoploss = document.querySelector("#sl");
    let minGain = document.querySelector("#minGain");
    let future = document.getElementById("future");
    if(entry.value == "" || amount.value == "" || callback.value == "" || activation.value == "" || future.value == ""){
        alert("Please fill in all fields");
        return;
    }
    stoploss.value = (activation.value - (activation.value * callback.value)/100);
    let priceDiff = entry.value - stoploss.value;
    let priceDiffPercent = (priceDiff / entry.value) * 100;
    let minGainValue = (priceDiffPercent * amount.value * future.value) / -100;
    minGain.value = minGainValue.toFixed(2);

}

function calculateActivation() {
    let entry = document.getElementById("entry");
    let amount = document.getElementById("amount");
    let callback = document.getElementById("callback");
    let desiredMinGain = document.getElementById("desiredMinGain");
    let activation = document.getElementById("activation");
    let future = document.getElementById("future");
    if(entry.value == "" || amount.value == "" || callback.value == "" || desiredMinGain.value == "" || future.value == ""){
        alert("Please fill in all fields");
        return;
    }
    let c = callback.value / 100;
    let activationValue = entry.value * (1 + desiredMinGain.value / (amount.value * future.value)) / (1 - c);
    activation.value = activationValue.toFixed(2);
}