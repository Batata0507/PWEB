// 4) Subconjunto
function verificarSubconjunto(palavra1, palavra2) {

  if (!palavra1 || !palavra2) {
    return "erro";
  }

  palavra1 = palavra1.toLowerCase();
  palavra2 = palavra2.toLowerCase();

  if (palavra1.includes(palavra2)) {
    return "é um subconjunto";
  } else {
    return "não é um subconjunto";
  }
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

  if (!data) {
    return "Data inválida";
  }

  // 🔧 CORREÇÃO DO FUSO (quebrando a data)
  let partes = data.split("-");
  let ano = Number(partes[0]);
  let mes = Number(partes[1]) - 1; // mês começa em 0
  let dia = Number(partes[2]);

  let d = new Date(ano, mes, dia);

  if (isNaN(d)) {
    return "Data inválida";
  }

  return dias[d.getDay()];
}


// ===== EVENTOS =====

// BOTÃO SUBCONJUNTO
document.getElementById("btnSubconjunto").addEventListener("click", function() {

  let p1 = document.getElementById("palavra1").value;
  let p2 = document.getElementById("palavra2").value;

  let resultado = verificarSubconjunto(p1, p2);

  document.getElementById("resSubconjunto").textContent = resultado;
});


// BOTÃO DATA
document.getElementById("btnData").addEventListener("click", function() {

  let data = document.getElementById("data").value;

  let resultado = diaDaSemana(data);

  document.getElementById("resData").textContent = resultado;
});