# Explicação do Código JavaScript

## 1. Evento de Enviar o Formulário

```javascript
document.getElementById('cep-form').addEventListener('submit', function(event) {
```

- **O que isso faz:** 
  - Quando você clica no botão para "Consultar", isso faz o botão funcionar. Ele diz: "Ei, quando alguém clicar no botão de enviar o formulário (botão que você usa para consultar o CEP), faça o que eu mandar."

- **Em palavras bem simples:** 
  - “Quando eu clicar no botão, faça alguma coisa.”

## 2. Impedir o Comportamento Padrão

```javascript
event.preventDefault();
```

- **O que isso faz:** 
  - Normalmente, quando você clica no botão de enviar, a página tenta mandar os dados para outro lugar e recarrega. Mas, com essa linha, você diz para a página "Pare! Não recarregue a página, eu quero fazer outra coisa primeiro!"

- **Em palavras bem simples:** 
  - “Não faça o que você sempre faz quando eu clico aqui. Fique parada.”

## 3. Pegando o Valor que Você Digitou

```javascript
const cep = document.getElementById('cep-input').value.trim();
```

- **O que isso faz:** 
  - Aqui, o código pega o que você digitou no campo do CEP. `.value` é o que você digitou, e `.trim()` só remove espaços desnecessários.

- **Em palavras bem simples:** 
  - “Pegue o que foi digitado e limpe os espaços extras.”

## 4. Mostrar e Esconder Coisas na Tela

```javascript
const loader = document.getElementById('loader');
const result = document.getElementById('result');
const error = document.getElementById('error');
```

- **O que isso faz:** 
  - Isso guarda em variáveis os elementos da tela: o "loader" (aquela animação de carregamento), a área onde os resultados vão aparecer (`result`), e onde os erros vão aparecer (`error`).

- **Em palavras bem simples:** 
  - “Guarde esses lugares da tela com nomes para eu usar depois.”

## 5. Limpar Resultados Anteriores

```javascript
result.innerHTML = '';
error.style.display = 'none';
```

- **O que isso faz:** 
  - Aqui, o código limpa qualquer resultado ou mensagem de erro antiga da tela, para que tudo fique limpinho antes de fazer a próxima consulta.

- **Em palavras bem simples:** 
  - “Limpe a bagunça da tela antes de começar de novo.”

## 6. Verificar se o CEP é Válido

```javascript
if (!/^\d{8}$/.test(cep)) {
```

- **O que isso faz:** 
  - Essa linha verifica se o CEP que você digitou tem exatamente 8 números. Se não tiver, vai dar um aviso de erro.

- **Em palavras bem simples:** 
  - “Se o que você digitou não for um número com 8 dígitos, faça outra coisa.”

## 7. Mostrar Mensagem de Erro

```javascript
error.innerHTML = 'Por favor, insira um CEP válido com 8 dígitos numéricos.';
error.style.display = 'block';
```

- **O que isso faz:** 
  - Se o CEP não for válido, essa parte mostra uma mensagem de erro na tela.

- **Em palavras bem simples:** 
  - “Mostre uma mensagem dizendo que o CEP está errado.”

## 8. Mostrar o Loader (Animação de Carregamento)

```javascript
loader.style.display = 'block';
```

- **O que isso faz:** 
  - Quando a consulta começa, mostra aquela animação de carregamento na tela.

- **Em palavras bem simples:** 
  - “Mostre a animação para dizer que está carregando.”

## 9. Criar a Requisição (Pedir Informações)

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', `https://viacep.com.br/ws/${cep}/json/`, true);
```

- **O que isso faz:** 
  - Aqui, o código prepara o pedido para pegar as informações do CEP da internet. Ele usa o que você digitou para montar o endereço da API (`https://viacep.com.br/ws/${cep}/json/`) e dizer: "Vá buscar os dados!"

- **Em palavras bem simples:** 
  - “Prepare-se para buscar as informações do CEP da internet.”

## 10. Esperar a Resposta

```javascript
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
```

- **O que isso faz:** 
  - O código espera até que a resposta da internet esteja pronta (quando `readyState` é 4).

- **Em palavras bem simples:** 
  - “Quando a resposta estiver pronta, continue.”

## 11. Esconder o Loader

```javascript
loader.style.display = 'none';
```

- **O que isso faz:** 
  - Quando a resposta chega, a animação de carregamento desaparece.

- **Em palavras bem simples:** 
  - “Pare de mostrar a animação porque a resposta chegou.”

## 12. Se a Resposta for Boa, Mostre os Resultados

```javascript
if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
```

- **O que isso faz:** 
  - Se a resposta for um sucesso (200 é o código para "tudo certo"), o código transforma o texto que veio em um objeto que o JavaScript pode entender (`JSON.parse`).

- **Em palavras bem simples:** 
  - “Se tudo estiver certo, pegue as informações e prepare para mostrar.”

## 13. Verificar se o CEP foi Encontrado

```javascript
if (response.erro) {
    error.innerHTML = 'CEP não encontrado. Por favor, tente outro.';
    error.style.display = 'block';
} else {
```

- **O que isso faz:** 
  - Se o CEP não existir, a API manda um "erro". Aqui, o código verifica se houve erro e, se sim, mostra uma mensagem dizendo que o CEP não foi encontrado.

- **Em palavras bem simples:** 
  - “Se o CEP estiver errado, avise que não foi encontrado.”

## 14. Mostrar as Informações do CEP

```javascript
result.innerHTML = `
    <p><strong>Cidade:</strong> ${response.localidade}</p>
    <p><strong>Estado:</strong> ${response.uf}</p>
    <p><strong>Rua:</strong> ${response.logradouro}</p>
    <p><strong>Bairro:</strong> ${response.bairro}</p>
`;
```

- **O que isso faz:** 
  - Se o CEP estiver certo, o código coloca as informações (cidade, estado, rua, bairro) na tela.

- **Em palavras bem simples:** 
  - “Mostre na tela as informações que vieram da internet.”

## 15. Se Algo Der Errado

```javascript
error.innerHTML = 'Ocorreu um erro ao buscar o CEP. Por favor, tente novamente mais tarde.';
error.style.display = 'block';
```

- **O que isso faz:** 
  - Se acontecer algum problema durante a busca, o código mostra uma mensagem de erro genérica.

- **Em palavras bem simples:** 
  - “Se algo deu errado e não sei o que foi, mostre uma mensagem de erro.”

## 16. Enviar a Requisição

```javascript
xhr.send();
```

- **O que isso faz:** 
  - Finalmente, essa linha diz "Agora vá lá e busque as informações!"

- **Em palavras bem simples:** 
  - “Agora, vá buscar as informações na internet.”

---

### Resumindo:

- **Eventos:** Fazem coisas acontecerem quando você clica ou interage com a página.
- **Requisição:** Pede informações de outro lugar na internet.
- **Validação:** Verifica se os dados estão corretos antes de continuar.
- **Exibição:** Mostra ou esconde coisas na tela dependendo do que acontece.

Tudo junto, isso faz com que, quando você digitar um CEP e clicar no botão, o código vá buscar as informações daquele CEP na internet e mostre os resultados na tela. Se o CEP estiver errado ou se algo der errado, ele te avisa.