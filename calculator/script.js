function appendToDisplay(value) {
    let screen = document.getElementById('display').value;
    if (screen === 'Error') {
        document.getElementById('display').value = '';
    } else if (screen === '0') {
        if (value =='.') {
            document.getElementById('display').value = '0.';
            breakpoint;
        }
        document.getElementById('display').value = '';
    }
    document.getElementById('display').value += value;
}


function clearDisplay() {
    document.getElementById('display').value = '0';
}

function calculate() {
    try {
        let result = eval(document.getElementById('display').value);
        document.getElementById('display').value = result;
    } catch (error) {
        document.getElementById('display').value = 'Error';
        document.getElementById('display').style.color = 'red';
        setTimeout(() => {
            document.getElementById('display').style.color = 'white';
        }, 1500);
        
    }
}
function flip(){
    calculate();
    let screen = document.getElementById('display').value;
    if (screen !== 'Error') {
        document.getElementById('display').value = 1/document.getElementById('display').value;
    }
}

function dell(){
    let screen = document.getElementById('display').value;
    if (screen === 'Error') {
        document.getElementById('display').value = '';
    }else {
        document.getElementById('display').value = document.getElementById('display').value.slice(0, -1); 
    }
    if (document.getElementById('display').value == ''){
        document.getElementById('display').value = '0';
    }
}

function abs(){
    calculate();
    let screen = document.getElementById('display').value;
    if (screen === 'Error') {
        document.getElementById('display').value = '';
    }else {
        if (document.getElementById('display').value < 0) {
            document.getElementById('display').value = -1 * document.getElementById('display').value;
        }
    }
}


function power_of_2(){
    calculate();
    let screen = document.getElementById('display').value;
    if (screen !== 'Error') {
        document.getElementById('display').value = Math.pow(document.getElementById('display').value, 2);
    }
}


function squar_root(){
    calculate();
    let screen = document.getElementById('display').value;
    if (screen !== 'Error') {
        document.getElementById('display').value = Math.sqrt(document.getElementById('display').value);
    }
}


function ms(){
    if (document.getElementById('display').value !== 'Error') {
        M = parseInt(document.getElementById('display').value);
    }
    return ;
}

function mc(){
    M = 0;
}

function mr(){
    document.getElementById('display').value = M;
}

function mm(){
    M = M - parseInt(document.getElementById('display').value);
}

function mp(){
    M = M + parseInt(document.getElementById('display').value);
}


function eventl(key){
    if (key == '.'|| key == '0' || key == '1' || key == '2' || key == '3' || key == '4' || key == '5' || key == '6' || key == '7' || key == '8' || key == '9'|| key == '+' || key == '-' || key == '*' || key == '/' || key == '%' || key == '(' || key == ')') {
        appendToDisplay(key);
    } else if (key == '=' || key == 'Enter') {
        calculate();
    } else if (key == 'c' ||key == 'C' || key == 'Escape') {
        clearDisplay();
    }else if (key == 'Backspace'){
        dell();
    };
}

function closeInfo(){
    document.getElementById('info').remove();
}

function dsa(){
    localStorage.setItem("info", "true");
    closeInfo();
}

if(localStorage.getItem("info") !== "true"){
    document.getElementById('cont').innerHTML = `<div id="info"><p>Hello! <br><br>To start using the calculator just click on the buttons using the mouse . <br> You can also use the keyboard to enter numbers and operations. <br> For example, you can type "1+2" and press Enter to calculate the result. <br> You can also use the following keyboard shortcuts: <br> <b>Backspace</b> to delete the last character, <b>Enter</b> or <b>=</b> to calculate the result, and <b>Escape</b> or <b>C</b> to clear the display. <br><br> Enjoy!<br><br></p><button class="button info" onclick="closeInfo()">Close</button><button class="button info" onclick="dsa()">Don't show again</button></div>`;
}

M = 0;
document.getElementById('display').value = '0';
document.addEventListener('keydown', function(event) {
    event.preventDefault();
    eventl(event.key);
});

function copyToClipboard() {
    let Text = document.getElementById("display");
    let copyText = document.getElementById("display").value;
    Text.select();
    Text.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(Text.value);
    document.getElementById("display").value = "Copied!";
    setTimeout(() => {document.getElementById('display').value = copyText}, 1000);
}




// localStorage.setItem('info', 'false'); //un comment this line to show the info again do not forget to recomment again :)
