const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#number");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+=[]{};:"<>,.?/';
let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();
// grey color

function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}
function setIndicator(color){
    indicator.style.backgroundColor = color;

}
function getRandInt(min,max){
   return Math.floor(Math.random() * (max-min))+ min;
}

function getRandomNumber(){
    return getRandInt(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRandInt(97,123))
}
function generateUpperCase(){
    return String.fromCharCode(getRandInt(65,91))
}
function generateSymbol(){
    const randNum = getRandInt(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSys = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSys = true;

    if(hasUpper && hasLower && (hasNum || hasSys) && passwordLength >=8){
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) && 
        (hasNum || hasSys) && 
        passwordLength >=6
    ){
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e){
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");
    setTimeout(() =>{
        copyMsg.classList.remove("active");
    },2000);
}
function sufflePassword(Array){
    for(let i = Array.length - 1; i>0 ; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = Array[i];
        Array[i] = Array[j];
        Array[j] = temp;
    }
    let str="";
    Array.forEach((el)=>(str += el));
    return str;
}
function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange)
})
inputSlider.addEventListener('input',(e) =>{
    passwordLength.e.target.value;
    handleSlider();
})
copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})
generateBtn.addEventListener('click', ()=>{
    if(checkCount<=0) return;
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
    password = "";
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += getRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }
    let functionArray = [];
    if(uppercaseCheck.checked)
        functionArray.push(generateUpperCase);
    if(lowercaseCheck.checked)
        functionArray.push(generateLowerCase);
    if(numbersCheck.checked)
        functionArray.push(getRandomNumber);
    if(symbolsCheck.checked)
        functionArray.push(generateSymbol);
    for(let i = 0 ; i<functionArray.length; i++)
        {
            password += functionArray[i]();
        }
    for(let i = 0 ; i<passwordLength-functionArray.length; i++)
        {
            let randIndex = getRandInt(0 , functionArray.length);
            password += functionArray[randIndex]();
        }
    password = sufflePassword(Array.from(password));
    passwordDisplay.value = password;
    calcStrength();
})