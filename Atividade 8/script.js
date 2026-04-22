let totalPessoas = 0;

let somaIdades = 0;
let maisVelha = 0;
let maisNova = Infinity;

let pessimo = 0;
let bomOtimo = 0;

let mulheres = 0;
let homens = 0;
let outros = 0;

// FORMULÁRIO
document.getElementById("formPesquisa").addEventListener("submit", function(e) {
  e.preventDefault();

  if (totalPessoas >= 45) {
    alert("Limite de 45 pessoas atingido!");
    return;
  }

  let idade = Number(document.getElementById("idade").value);
  let sexo = document.getElementById("sexo").value;
  let opiniao = Number(document.getElementById("opiniao").value);

  // Soma idade
  somaIdades += idade;

  // Mais velha / mais nova
  if (idade > maisVelha) maisVelha = idade;
  if (idade < maisNova) maisNova = idade;

  // Péssimo
  if (opiniao === 1) pessimo++;

  // Bom ou ótimo
  if (opiniao === 3 || opiniao === 4) bomOtimo++;

  // Sexo
  if (sexo === "f") mulheres++;
  else if (sexo === "m") homens++;
  else outros++;

  totalPessoas++;

  // Atualiza contador
  document.getElementById("contador").textContent =
    `Pessoas cadastradas: ${totalPessoas} / 45`;

  // Limpa formulário
  document.getElementById("formPesquisa").reset();
});


// BOTÃO RESULTADO
document.getElementById("btnResultado").addEventListener("click", function() {

  if (totalPessoas === 0) {
    alert("Nenhum dado inserido!");
    return;
  }

  let media = somaIdades / totalPessoas;
  let porcentagem = (bomOtimo / totalPessoas) * 100;

  document.getElementById("resultado").innerHTML = `
    <h2>Resultados</h2>
    Média de idade: ${media.toFixed(2)} <br>
    Mais velha: ${maisVelha} <br>
    Mais nova: ${maisNova} <br>
    Quantidade de péssimo: ${pessimo} <br>
    Porcentagem bom/ótimo: ${porcentagem.toFixed(2)}% <br>
    Mulheres: ${mulheres} <br>
    Homens: ${homens} <br>
    Outros: ${outros}
  `;
});
