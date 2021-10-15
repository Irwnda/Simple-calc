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
    }

    delete(){
        if(this.currentOperand !== '')
            this.currentOperand = this.currentOperand.toString().slice(0, -1)
        else if(this.currentOperand === '' && this.previousOperand !== ''){
            this.currentOperand = this.previousOperand
            this.previousOperand = ''
            this.operator = undefined
        }
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        if(this.currentOperand.length < 16)
            this.currentOperand = this.currentOperand.toString() + number
    }

    operatorFunction(operator){
        if(this.currentOperand === ''){
            if(this.previousOperand !== '')
                this.operator = operator
            return
        }
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let result
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operator){
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case '*':
                result = prev * current
                break
            case '÷':
                result = prev / current
                break
            default:
                return
        }
        this.currentOperand = result
        this.operator = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operator != undefined){
            this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand) + ' ' + this.operator
        }
        else {
            this.previousOperandTextElement.innerText = this.getDisplayNumber(this.previousOperand)
        }
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

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operatorFunction(button.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

const sun = document.querySelector('.fa-sun')
const moon = document.querySelector('.fa-moon')
var darkMode = true
updateMode()

sun.addEventListener('click', () => {
    if(darkMode){
        darkMode = false
        sun.classList.remove('inactive')
        moon.classList.add('inactive')
        updateMode()
    }

})

moon.addEventListener('click', () => {
    if(!darkMode){
        darkMode = true
        moon.classList.remove('inactive')
        sun.classList.add('inactive')
        updateMode()
    }
})

function updateMode(){
    const body = document.querySelector('body')
    const container = document.querySelector('.container')
    const switchArea = document.querySelector('.switch')
    const switch_i = document.querySelector('.switch i')
    const button = document.querySelector('.button')
    const button_button = document.querySelectorAll('.button > button')
    const notNum = document.querySelectorAll('[notNum]')
    const number = document.querySelectorAll('[number]')
    const prev = document.querySelector('.output .previous-operand')
    const cur = document.querySelector('.output .current')

    if(darkMode) {
        body.style.backgroundColor = 'darkslategray'
        container.style.backgroundColor = 'var(--primary)'
        switchArea.style.backgroundColor = 'var(--secondary)'
        switch_i.style.color = 'var(--granny-smith)'
        sun.style.color = 'var(--granny-smith)'
        moon.style.color = 'var(--white-text)'
        button.style.backgroundColor = 'var(--secondary)'
        
        button_button.forEach(btn => {
            btn.style.backgroundColor = 'var(--secondary)'
            btn.style.border = '1px solid var(--secondary)'
            btn.classList.add('darkMode')
            btn.classList.remove('lightMode')
        })
        
        notNum.forEach(btn => {
            btn.style.color = 'var(--turquoise)'
        })
        number.forEach(btn => {
            btn.style.color = 'var(--white-text)'
        })
        prev.style.color = 'rgba(255, 255, 255, .75)'
        cur.style.color = 'rgba(255, 255, 255, 1)'
    }
    else {
        body.style.backgroundColor = 'var(--granny-smith)'
        container.style.backgroundColor = 'white'
        switchArea.style.backgroundColor = '#f5f5f5'
        switch_i.style.color = 'var(--granny-smith)'
        sun.style.color = 'var(--primary)'
        moon.style.color = 'var(--granny-smith)'
        button.style.backgroundColor = '#f5f5f5'

        button_button.forEach(btn => {
            btn.style.backgroundColor = '#f5f5f5'
            btn.style.border = '1px solid #f5f5f5'
            btn.classList.remove('darkMode')
            btn.classList.add('lightMode')
        })
        notNum.forEach(btn => {
            btn.style.color = 'var(--turquoise)'
        })
        number.forEach(btn => {
            btn.style.color = 'var(--primary)'
        })

        prev.style.color = 'var(--granny-smith)'
        cur.style.color = 'var(--primary)'
    }
}