class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear(){
        this.previousOperand = ''
        this.currentOperand = ''
        this.operator = undefined
        this.updateDisplay()
    }

    delete(){

    }

    appendNumber(number){
        this.currentOperand = this.currentOperand.toString() + number
    }

    operatorFunction(operator){

    }

    compute(){

    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        console.log(this.currentOperand)
    }
}

const numberButtons = document.querySelectorAll('[number]')
const operatorButtons = document.querySelectorAll('[operator]')
const equalsButton = document.querySelector('[equals]')
const deleteButton = document.querySelector('[delete]')
const allClearButton = document.querySelector('[all-clear]')
const previousOperandTextElement = document.querySelector('[previous]')
const currentOperandTextElement = document.querySelector('[current]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
})