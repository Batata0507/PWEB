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
function verificarSubconjunto(p1, p2) {
  if (!p1 || !p2) return "erro";

  return p1.toLowerCase().includes(p2.toLowerCase())
    ? "é um subconjunto"
    : "não é um subconjunto";
}

// 5) Dia da semana
function diaDaSemana(data) {
  let dias = ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"];

  if (!data) return "Data inválida";

  let partes = data.split("-");
  let d = new Date(partes[0], partes[1] - 1, partes[2]);

  return dias[d.getDay()];
}


// ===== EVENTOS =====

// FUNÇÃO 1
btnMaior.addEventListener("click", () => {
  resMaior.textContent =
    "Maior: " + maiorNumero(Number(n1.value), Number(n2.value), Number(n3.value));
});

// FUNÇÃO 2 (AGORA COM INPUTS PRÓPRIOS)
btnOrdem.addEventListener("click", () => {
  resOrdem.textContent =
    "Ordem: " + ordenarNumeros(Number(n4.value), Number(n5.value), Number(n6.value));
});

// FUNÇÃO 3
btnPalindromo.addEventListener("click", () => {
  resPalindromo.textContent = ehPalindromo(texto.value);
});

// FUNÇÃO 4
btnSubconjunto.addEventListener("click", () => {
  resSubconjunto.textContent =
    verificarSubconjunto(palavra1.value, palavra2.value);
});

// FUNÇÃO 5
btnData.addEventListener("click", () => {
  resData.textContent = diaDaSemana(data.value);
});