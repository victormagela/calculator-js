const display = document.getElementById("display");
const buttons = document.querySelectorAll("#buttons button");

let arr = Array.from(buttons);

let firstNumber = "";
let operator = "";
let currentInput = "";
let shouldResetInput = false;

arr.forEach(button => {
    button.addEventListener("click", () => {

        if (button.classList.contains("num")) {
            if (shouldResetInput === true) {
                currentInput = "";
                firstNumber = "";
                operator = "";
                shouldResetInput = false;
            }

            if (button.textContent === "." && currentInput.includes(".")) return;
            if (button.textContent === "." && currentInput === "") currentInput = "0";

            currentInput += button.textContent;
            display.value = currentInput;
        }
        else if (button.classList.contains("operator")) {
            shouldResetInput = false;

            if (currentInput === "") {
                if (firstNumber !== "") {
                    let opClicked = button.textContent;
                    if (opClicked === "x") opClicked = "*";
                    if (opClicked === "÷") opClicked = "/";
                    operator = opClicked;
                }
                return;
            }

            let opClicked = button.textContent;
            if (opClicked === "x") opClicked = "*";
            if (opClicked === "÷") opClicked = "/";

            if (firstNumber === "") {
                firstNumber = Number(currentInput);
                operator = opClicked;
                currentInput = "";
                return;
            }

            if (operator === "") {
                operator = opClicked;
                currentInput = "";
                return;
            }

            const result = operate(firstNumber, operator, Number(currentInput));
            
            if (result === "Error") {
                display.value = result;
                firstNumber = "";
                operator = "";
                currentInput = "";
                return;
            }

            firstNumber = result;
            operator = opClicked;
            currentInput = "";
            display.value = String(result);
        }
        else if (button.id === "equal-symbol") {
            if (firstNumber === "" || operator === "" || currentInput === "") return;

            const result = operate(firstNumber, operator, Number(currentInput));

            if (result === "Error") {
                display.value = "Error";
                firstNumber = "";
                operator = "";
                currentInput = "";
                return;
            }

            display.value = String(result);
            firstNumber = result;
            operator = "";
            currentInput = "";
            shouldResetInput = true;
        }
        else if (button.textContent === "Clear") {
            display.value = "0";
            firstNumber = "";
            operator = "";
            currentInput = "";
            shouldResetInput = false;
        }
        else if (button.textContent === "⌫") {
            if (shouldResetInput) return;
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }
    });
})

function operate(a, op, b) {
    switch (op) {
        case "+":
            return a + b;

        case "-":
            return a - b;

        case "*":
            return a * b;

        case "/":
            if (b === 0) {
                return "Error";
            }
            return a / b;
    }
}