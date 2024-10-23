const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let player = "X";

let possiblePositionsToWin = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function initial() {
  // Aqui temos como o nosso jogo começará.
  selected = []; // O padrão como tendo um array vazio para "selected"

  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`; // Aqui teremos o primeiro movimento como sendo do 'player', que é dado como X.

  document.querySelectorAll(".game button").forEach((item) => {
    // Selecionaremos todos os botões dentro da classe .game e atribuiremos um 'forEach' - para cada.
    item.innerHTML = ""; // Aqui teremos o padrão de string vazia para o inicio ainda
    item.addEventListener("click", newMove); // Aqui temos um listener que vai funcionar para cada click, dado como novo movimento - newMove;
  });
}

initial(); // renderizamos o início do jogo, portanto.

function newMove(event) {
  // criamos uma função para novo movimento que recebe "event" como parametro.
  const index = event.target.getAttribute("data-i"); // aqui guardamos dentro da constante "index" o nosso objeto "event" acompanhado do .target, que, juntos, indica onde foi que ocorreu nosso evento. É uma MARCAÇÃO, uma TARGET. Com isso, sinalizamos de onde ele deve pegar a informação, que é o atributo lá do nosso HTML - o data-i.
  event.target.innerHTML = player; // então sempre que tivermos o nosso evento acontecendo e marcado (event.target), através do click, nos retornará pelo valor do nosso "player", que é nossa variável que foi criada.
  event.target.removeEventListener("click", newMove); // a partir de todos os eventos supracitados, agora removemos o evento de click para esse local em específico, para que não seja possível ficar ocorrendo trocas. Isso aqui "trava" o botão na resposta que já foi dada com nosso click.
}
