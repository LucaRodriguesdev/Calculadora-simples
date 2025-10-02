const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");


class Calcular{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    addDigit(digit){
    console.log(digit);
    if(digit === "." && this.currentOperation.includes(".")){
        return;
    }
    this.currentOperation = digit;      // concatena o dígito no valor atual
    this.updateScreen();                 // atualiza a tela com currentOperation
}

    processOperation(operacao){
        if(currentOperationText.innerText === "" && operacao !== "C"){
            if(this.previousOperationText.innerText !== ""){
                this.changeOperation(operacao);
            }
            return;
        }
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch(operacao){
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operacao, current, previous)
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operacao, current, previous)
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operacao, current, previous)
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operacao, current, previous)
                break;
            case "Del":
                this.processDelOp();
                break;
            case "CE":
                this.processClearOp();
                break;
            case "C":
                this.processClearAllOp();
                break;
            case "=":
                this.processEqualOp();
                break;
            default:
                return
        }
    }


    updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
        this.currentOperationText.innerText += this.currentOperation;
    } else {
    
      if (previous === 0) {
        operationValue = current;
      }
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

    changeOperation(operacao){
        const mathOperations = ["*", "/", "+", "-"];
        if(!mathOperations.includes(operacao)){
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0,-1) + operacao;
    }
    processDelOp(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }
    processClearOp(){
        this.currentOperationText.innerText = "";
    }
    processClearAllOp(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    processEqualOp(){
        const op = previousOperationText.innerText.split(" ")[1];
        this.processOperation(op);
    }

}
const calc = new Calcular(previousOperationText, currentOperationText);


buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        if(+value >=0 || value == "."){
            console.log(value)
            calc.addDigit(value);
        }else{
            calc.processOperation(value);

        }
    });
});