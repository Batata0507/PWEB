function jogar(escolhaUsuario) {

  const opcoes = ['pedra', 'papel', 'tesoura'];

  // escolha aleatória do computador
  const escolhaPC = opcoes[Math.floor(Math.random() * 3)];

  // mostrar escolhas
  document.getElementById("user").innerText = "Você: " + escolhaUsuario;
  document.getElementById("pc").innerText = "Computador: " + escolhaPC;

  let resultado = "";

  if (escolhaUsuario === escolhaPC) {
    resultado = "Empate!";
  } else if (
    (escolhaUsuario === "pedra" && escolhaPC === "tesoura") ||
    (escolhaUsuario === "tesoura" && escolhaPC === "papel") ||
    (escolhaUsuario === "papel" && escolhaPC === "pedra")
  ) {
    resultado = "Você venceu!";
  } else {
    resultado = "Computador venceu!";
  }

  document.getElementById("vencedor").innerText = resultado;
}