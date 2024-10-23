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
  /** Aqui temos como o nosso jogo começará. */
  selected = []; /** O padrão como tendo um array vazio para "selected" */

  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`; /** Aqui teremos o primeiro movimento como sendo do 'player', que é dado como X. */

  document.querySelectorAll(".game button").forEach((item) => {
    /** Selecionaremos todos os botões dentro da classe .game e atribuiremos um 'forEach' - para cada. */
    item.innerHTML =
      ""; /** Aqui teremos o padrão de string vazia para o inicio ainda */
    item.addEventListener(
      "click",
      newMove
    ); /** Aqui temos um listener que vai funcionar para cada click, dado como novo movimento - newMove; */
  });
}

initial(); /** renderizamos o início do jogo, portanto. */

function newMove(event) {
  /** criamos uma função para novo movimento que recebe "event" como parametro. */
  const index =
    event.target.getAttribute(
      "data-i"
    ); /** aqui guardamos dentro da constante "index" o nosso objeto "event" acompanhado do .target, que, juntos, indica onde foi que ocorreu nosso evento. É uma MARCAÇÃO, uma TARGET. Com isso, sinalizamos de onde ele deve pegar a informação, que é o atributo lá do nosso HTML - o data-i. */
  event.target.innerHTML =
    player; /** então sempre que tivermos o nosso evento acontecendo e marcado (event.target), através do click, nos retornará pelo valor do nosso "player", que é nossa variável que foi criada. */
  event.target.removeEventListener(
    "click",
    newMove
  ); /** a partir de todos os eventos supracitados, agora removemos o evento de click para esse local em específico, para que não seja possível ficar ocorrendo trocas. Isso aqui "trava" o botão na resposta que já foi dada com nosso click. */
  selected[index] =
    player; /** Aqui vai armazenar na posição clicada o player X. */

  /** Define um tempo de espera */
  setTimeout(() => {
    check();
  }, [100]);

  /** O ? : é uma maneira simples de fazer uma pergunta e escolher entre duas respostas.
  A pergunta é: "O jogador atual é X?"
  Se a resposta for sim, então o jogador vira "O".
  Se a resposta for não, então o jogador vira "X". */
  player = player === "X" ? "O" : "X";
  currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
}

/** Aqui vamos verificar quem foi o último jogador. Essa informação é guardada na variável playerLastMove */
function check() {
  let playerLastMove = player === "X" ? "O" : "X";

  /** Aqui, criamos uma função chamada items que vai armazenar as posições onde o último jogador jogou */
  const items = selected
    .map((item, indice) => {
      /** Para cada item de "selected", pegamos o valor do item (que é o jogador "X" ou "O")
      e também a posição (índice) onde está o item no array. */
      return [
        item,
        indice,
      ]; /** Cada item do array vira um par: [valor, posição]*/
    })
    .filter((item) => {
      /** Agora, vamos pegar só os itens onde o valor é igual ao do jogador que jogou por último (playerLastMove). */
      return (
        item[0] === playerLastMove
      ); /** Se o valor for igual ao último jogador, mantemos o item */
    })
    .map((item) => {
      /** Depois, pegamos apenas a posição (índice) de onde esse jogador jogou. */
      return item[1]; /** item[1] é o índice (posição no tabuleiro) onde ele jogou */
    });

  /**
   * Aqui estamos fazendo um laço for para percorrer todas as posições possíveis de vitória
   * que estão guardadas em 'positions'.
   */
  for (pos of possiblePositionsToWin) {
    /**
     * O método every vai verificar se todos os itens de 'pos' (uma das combinações para vencer)
     * estão incluídos no array 'items', que contém as posições jogadas pelo último jogador.
     */
    if (pos.every((item) => items.includes(item))) {
      /**
       * Se todos os itens de 'pos' forem encontrados em 'items', isso significa que o jogador
       * conseguiu formar uma sequência vencedora, então mostramos um alerta dizendo que o
       * último jogador ganhou.
       */
      alert("O JOGADOR '" + playerLastMove + "' GANHOU!");

      /**
       * Depois de alguém vencer, reiniciamos o jogo chamando a função 'initial()'.
       */
      initial();

      /**
       * O 'return' aqui serve para parar a função. Não precisa continuar verificando outras
       * combinações, já que o jogo terminou.
       */
      return;
    }
  }

  /**
   * Verificamos se todas as posições do tabuleiro já foram preenchidas.
   * O filter((item) => item) vai pegar todas as posições do array 'selected' que não estão vazias.
   * Se o tamanho desse array filtrado for 9, isso significa que todas as posições foram ocupadas.
   */
  if (selected.filter((item) => item).length === 9) {
    /**
     * Se todas as posições estiverem preenchidas e ninguém venceu, mostramos uma mensagem de empate.
     */
    alert("DEU EMPATE!");

    /**
     * O 'return' aqui encerra a execução da função, porque o jogo acabou com empate.
     */
    return;
  }
}
