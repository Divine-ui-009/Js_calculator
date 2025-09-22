let display = document.getElementById('initialDisplay');
let finalDisplay = document.getElementById('finalDisplay');
let clearBtn = document.getElementById('clearbtn')

const button=document.getElementsByTagName('button')

let operator = '';
let currentInput= "";

function updateClearButton(){
    if(finalDisplay.value !== '0' ||finalDisplay.value == 'Error'){
        clearBtn.textContent = 'AC';
    }else if(currentInput.length > 0){
        clearBtn.textContent = 'C';
    }else{
        clearBtn.textContent = 'AC';
    }
}

function clearInput(){
    if(clearBtn.textContent === 'AC'){
        currentInput = '';
        display.value = '0';
        finalDisplay.value = '0';
    }else{
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || '0';
    }
    updateClearButton();
}

function appendNum(num){
    // Prevent leading zeros
    if(currentInput === '0') {
        currentInput = '';
    }
    currentInput += num;
    display.value = currentInput;
    updateClearButton();
}

function appendOperator(op){
    if (currentInput === '') {
        if(op === '-' || op==='+' || op==='*' || op==='/' || op==='%'){
            currentInput = '-' || '+' || '*' || '/' || '%';
            display.value =currentInput;
            updateClearButton();
        }
        return;
    }
    // Only replace the last character if it's an operator
    if (/[+\-*/%]$/.test(currentInput)) {
        currentInput = currentInput.slice(0, -1);
    }

    if(currentInput.slice(-1) === '.'){
        return;
    }

    currentInput += op;
    display.value = currentInput;
    updateClearButton();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        if (currentInput === '' || /[=+\-*/%]$/.test(currentInput)) {
            currentInput += '0.';
        } else {
            currentInput += '.';
        }
        display.value = currentInput;
        updateClearButton();
    }
}

function calculate() {
    try {
        let result = eval(currentInput);
        finalDisplay.value = currentInput;

        currentInput = result.toString();
        display.value = currentInput;
    } catch (e) {
        finalDisplay.value = 'Error'; 
        updateClearButton();
    }
}
// Set initial values on load
window.onload = function() {
    display.value = '';
    finalDisplay.value = '';
};
