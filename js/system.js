/*
 * Calculator script.
 */
let Calculator = {
    /* Variables */
    value: 0,
    operator: "",
    clear: false,

    /* Access HTML properties */
    main: document.querySelector("#calculator"),
    keys: document.querySelectorAll("#keyboard .num"),
    operators: document.querySelectorAll("#keyboard .operator"),
    btnClear: document.querySelectorAll("#keyboard .clear"),
    btnEquals: document.querySelector("#keyboard .equals"),
    displayValue: document.querySelector("#screen h2"),
    histValue: document.querySelector("#screen h1"),

    calculate: function(a, b, sign){
        switch(sign){
            case "add":
                b = a + b;
                break;
            case "multiply":
                b = a * b;
                break;
            case "divide":
                b = a / b;
                break;
            case "subtract":
                b = a - b;
                break;
            case "":
                b = b;
                break;
            default:
                return false;
        }

        return b;
    },

    start: function(){

        this.displayValue.textContent = 0;
        this.histValue.textContent = null;

        this.keys.forEach((button) => {
            button.addEventListener('click', () => {
                if(this.clear){
                    this.displayValue.textContent = '';
                    this.clear = false;
                }
                if (this.displayValue.textContent.length > 10)  { return }
                if (button.textContent === '.' && this.displayValue.textContent.includes('.')) { return }
                this.displayValue.textContent += button.textContent;
                if (this.displayValue.textContent.charAt(0) === '0' && this.displayValue.textContent.length > 1){
                    this.displayValue.textContent = this.displayValue.textContent.substring(1);
                }
            });
        });

        this.operators.forEach((button) => {
            button.addEventListener("click", () => {
                if (this.displayValue.textContent == '') {
                } else {
                    this.value = this.calculate(this.value, parseFloat(this.displayValue.textContent), this.operator);
                }
                this.operator = button.getAttribute("id");
                this.histValue.textContent = this.value +  button.textContent;
                this.displayValue.textContent = '';
            })
        });

        this.btnClear.forEach((button) => {
            button.addEventListener("click", () => {
                switch (button.getAttribute("id")) {
                    case "ac":
                        this.displayValue.textContent = '0';
                        this.histValue.textContent = '';
                        this.value = 0;
                        this.operator = '';
                        this.clear = false;
                        break;
                    case "clear":
                        this.displayValue.textContent = '';
                        break;
                    case "undo":
                        this.displayValue.textContent = this.displayValue.textContent.slice(0, -1);
                        break;
                    default:

                }
            })
        });

        this.btnEquals.addEventListener('click', () => {
            if (this.displayValue.textContent == '' )
                this.displayValue.textContent = this.value;
            else
                this.displayValue.textContent = this.calculate(
                    this.value,
                    parseFloat(this.displayValue.textContent),
                    this.operator
                );

            this.operator = '';
            this.histValue.textContent = '';
            this.clear = true;
            this.displayValue.textContent  = (this.displayValue.textContent > 99999999999) ? 'limit_reached' : this.displayValue.textContent;
            this.displayValue.textContent  = (Math.trunc(parseFloat(this.displayValue.textContent)*1000000))/1000000;
        });


    },
};

Calculator.start();