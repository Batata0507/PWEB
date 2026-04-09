// Pedindo os números
let num1 = parseFloat(prompt("Digite o primeiro número:"));
let num2 = parseFloat(prompt("Digite o segundo número:"));

// Calculando
let soma = num1 + num2;
let subtracao = num1 - num2;
let multiplicacao = num1 * num2;
let divisao = num1 / num2;
let resto = num1 % num2;

// Mostrando resultado
alert(
    "Resultados:\n" +
    "Soma: " + soma +
    "\nSubtração: " + subtracao +
    "\nMultiplicação: " + multiplicacao +
    "\nDivisão: " + divisao +
    "\nResto: " + resto
);