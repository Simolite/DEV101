let calc = document.getElementById("calc");
calc.addEventListener("click", calculate);

function calculate (){
    let entry = document.getElementById("entry");
    let amount = document.getElementById("amount");
    let callback = document.getElementById("callback");    
    let activation = document.getElementById("activation");
    let stoploss = document.querySelector("#sl");
    let minGain = document.querySelector("#minGain");
    let future = document.getElementById("future");
    stoploss.value = (activation.value - (activation.value * callback.value)/100);
    let priceDiff = entry.value - stoploss.value;
    let priceDiffPercent = (priceDiff / entry.value) * 100;
    let minGainValue = (priceDiffPercent * amount.value * future.value) / -100;
    minGain.value = minGainValue.toFixed(2);

}