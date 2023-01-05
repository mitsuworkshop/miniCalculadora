// Definindo variáveis
var firstNum = true;
var num1 = 0;
var num2 = " ";
var y = 0;
var lockOperation = "";
var memoryOp = "";
var memoryNum2 = 0;

// Operações da Calculadora
// A ideia de ter um equal é porque a pessoa pode querer fazer logo uma operação depois da outra (v2)

var operations = {
  add: function() {
    if (memoryNum2 === "") {
      num1 = num1 + num2;
      memory = "add";
    } else {
      num1 = num1 + memoryNum2;
      memory = "add";
    }
    return newCalc();
  },
  sub: function() {
    num1 = num1 - num2;
    memory = "sub";
    return newCalc();
  },
  multiply: function() {
    num1 = num1 * num2;
    memory = "muliply";
    return newCalc();
  },
  divide: function() {
    num1 = num1 / num2;
    memory = "divide";
    return newCalc();
  },
}

function newCalc() {
  if (memoryNum2 === "") {
    document.getElementById("log").textContent += num2 +" = " + num1;
  } else {
    document.getElementById("log").textContent += memoryNum2 + " = " + num1;
  }
  document.getElementById("result").textContent = num1;
  firstNum = true;
  num2 = " ";
}

// Função de apagar
document.getElementById("del").addEventListener("click", del);

function del() {
  if (firstNum === true) {
    y = (num1.toString()).slice(num1.length, -1)
    num1 = Number(y)
    document.getElementById("result").textContent = num1;
    return num1;
  } else {
    num2 = Math.floor(num2 / 10);
    y = (num1.toString()).slice(num2.length, -1)
    document.getElementById("result").textContent = num2;
    return num2;
  }
}

// Antiga forma de cortar um número. Problema: não funciona com números abaixo de 1
// function del() {
//   if (firstNum === true) {
//     num1 = Math.floor(num1 / 10);
//     document.getElementById("result").textContent = num1;
//     return num1;
//   } else {
//     num2 = Math.floor(num2 / 10);
//     document.getElementById("result").textContent = num2;
//     return num2;
//   }
// }


// Função de inserir número

var number = document.getElementsByClassName("number");

for (var i = 0; i < number.length; i++) {
  number[i].addEventListener("click", insert);
}

function insert() {
  if (firstNum === true) {
    y = (num1.toString()) + (this.getAttribute("value"));
    num1 = Number(y);
    document.getElementById("result").textContent = num1;

    return num1;
  } else {
    y = (num2.toString()) + (this.getAttribute("value"));
    num2 = Number(y);
    document.getElementById("result").textContent = num2;


    return num2;
  }
}

// Função de limpar tudo
document.getElementById("clear").addEventListener("click", clear);

function clear() {
  num1 = 0;
  num2 = 0;
  firstNum = true;
  document.getElementById("result").textContent = num1;
  document.getElementById("log").textContent = "";
}

// Função de iniciar a operação

var operacao = document.getElementsByClassName("op");

for (var a = 0; a < operacao.length; a++) {
  operacao[a].addEventListener("click", operation);
}

function operation() {
  if (firstNum === false) {
    memoryNum2 = num2;
    return operations[lockOperation]();
  } else {
    lockOperation = this.getAttribute("value");

    // Aqui a ele faz o registro na caixa cinza
    document.getElementById("log").textContent += "\n" + num1;
    document.getElementById("log").textContent += " " + lockOperation + " ";

    document.getElementById("result").textContent = num2;

    firstNum = false;
  }
}

// Função = (igual)
document.getElementById("equal").addEventListener("click", equal);

function equal() {
  if (firstNum === true) {
    document.getElementById("log").textContent += "\n" + num1;
    document.getElementById("log").textContent += " " + lockOperation + " ";
    operations[memory]();
  } else {
    memoryNum2 = num2;
    return operations[lockOperation]();
  }

}
