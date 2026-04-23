// 1) Maior número
function maiorNumero(a, b, c) {
  return Math.max(a, b, c);
}


// 2) Ordem crescente
function ordenarNumeros(a, b, c) {
  return [a, b, c].sort((x, y) => x - y);
}


// 3) Palíndromo
function ehPalindromo(texto) {

  if (!texto) return "erro";

  let tratado = texto.toLowerCase().replace(/\s/g, "");
  let invertido = tratado.split("").reverse().join("");

  return tratado === invertido ? "é palíndromo" : "não é palíndromo";
}


// 4) Subconjunto
function verificarSubconjunto(palavra1, palavra2) {

  if (!palavra1 || !palavra2) {
    return "erro";
  }

  palavra1 = palavra1.toLowerCase();
  palavra2 = palavra2.toLowerCase();

  return palavra1.includes(palavra2)
    ? "é um subconjunto"
    : "não é um subconjunto";
}


// 5) Dia da semana (CORRIGIDO)
function diaDaSemana(data) {

  let dias = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
  ];

  if (!data) return "Data inválida";

  let partes = data.split("-");
  let ano = Number(partes[0]);
  let mes = Number(partes[1]) - 1;
  let dia = Number(partes[2]);

  let d = new Date(ano, mes, dia);

  if (isNaN(d)) return "Data inválida";

  return dias[d.getDay()];
}


// ===== EVENTOS =====

// NÚMEROS
document.getElementById("btnNumeros").addEventListener("click", function () {

  let a = Number(document.getElementById("n1").value);
  let b = Number(document.getElementById("n2").value);
  let c = Number(document.getElementById("n3").value);

  let maior = maiorNumero(a, b, c);
  let ordem = ordenarNumeros(a, b, c);

  document.getElementById("resNumeros").textContent =
    `Maior: ${maior} | Ordem: ${ordem}`;
});


// PALÍNDROMO
document.getElementById("btnPalindromo").addEventListener("click", function () {

  let texto = document.getElementById("texto").value;

  let resultado = ehPalindromo(texto);

  document.getElementById("resPalindromo").textContent = resultado;
});


// SUBCONJUNTO
document.getElementById("btnSubconjunto").addEventListener("click", function () {

  let p1 = document.getElementById("palavra1").value;
  let p2 = document.getElementById("palavra2").value;

  let resultado = verificarSubconjunto(p1, p2);

  document.getElementById("resSubconjunto").textContent = resultado;
});


// DATA
document.getElementById("btnData").addEventListener("click", function () {

  let data = document.getElementById("data").value;

  let resultado = diaDaSemana(data);

  document.getElementById("resData").textContent = resultado;
});