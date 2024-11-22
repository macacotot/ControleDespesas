const transactionUl = document.querySelector("#transactions");  // O # serve para acessar um objeto expecifico no index por meio do  comando "querySelector"
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')
console.log({ inputTransactionName, inputTransactionAmount });

//let dummyTransactions = [
  // { id: 1, name: "Bolo de brigadeiro", amount: -20 },  //amount é o valor, que nesse caso significa despesa por estar negativo
  // { id: 2, name: "Salário", amount: 300 },
  // { id: 3, name: "Torta de limão", amount: -10 },
  // { id: 4, name: "Bateria", amount: 150 },
//];

const localStorageTransactions = JSON.parse(localStorage
  .getItem('transactions'))

  let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
  transactions = transactions.filter(transaction => transaction.id !== ID) // Vai excluir a transação que a pessoa eliminou clicando no X e vai retornar todas as outras.
  init()
}

const addTransactionIntoDOM = (transaction) => {
  const operator = transaction.amount < 0 ? "-" : "+";  // é um IF ELSE reduzido sendo '?' o IF e o ':' o ELSE então se t.amount for menor se 0 vai ser '-' se não for será '+'
  const CSSClass = transaction.amount < 0 ? "minus" : "plus";
  const amountWithoutOperator = Math.abs(transaction.amount);
  const li = document.createElement("li");

  li.classList.add(CSSClass);
  li.innerHTML = `
        ${transaction.name} <span> ${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn" onclick = "removeTransaction(${transaction.id})">x</button>  `;

  transactionUl.append(li);
  //   transactionUl.prepend(li);

  // console.log(li);
  //console.log(operator);

  {
    // <li class="minus">
    //     Salário <span>-$400</span><button class="delete-btn">x</button>
    // </li>
  }
};

// addTransactionIntoDOM(transactions[0]);
// addTransactionIntoDOM(transactions[1]);

const updateBalanceValues = () => {
  const transactionsAmounts = transactions.map(
    (transaction) => transaction.amount
  ); //O map nesse caso permite que manipulemos somente os atributos necessários para que realizemos o cálculo

  console.log(transactionsAmounts);

  const income = transactionsAmounts //income são as receitas
    .filter((value) => value > 0) //filtra os valores do vetor, retornando somente os números que atendem a condição
    .reduce((accumulator, value) => accumulator + value, 0) // O reduce é uma alternativa mais otimizada para realizara a soma de valores 
    .toFixed(2);

  const expense = Math.abs(transactionsAmounts  //Math.abs serve para pegar a penas o valor absoluto, ou seja, sem os sinais (- ou +)
    .filter((value) => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0))
    .toFixed(2);
  console.log(expense)  //expense são as despesas

  const total = transactionsAmounts
    .reduce((acumulator, transaction) => acumulator + transaction, 0) //soma e reduz os elementos do array em somente um
    .toFixed(2);
  balanceDisplay.textContent = `R$ ${total}`
  incomeDisplay.textContent = `R$ ${income}`
  expenseDisplay.textContent = `R$ ${expense}`
  console.log(income);
};


const init = () => {
  transactionUl.innerHTML= ''
  transactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
};


init();

const upDateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

const generateID = ()=> Math.round(Math.random()*1000) //Serve para criar os ID, que serve para identificação da transação de forma automatica

form.addEventListener('submit', event => {
  event.preventDefault()
  const transName = inputTransactionName.value.trim()
  const transAmount = inputTransactionAmount.value.trim()
  if(transName==='' || transAmount === ''){
    alert('Por gentileza preencha tanto o nome quanto o valor da transação!!!')
    return
  }
  const transaction = { id: generateID(), 
    name: transName, 
    amount: Number(transAmount) } //Somente o transAmount faz com que o código identifique o valor como string, não permitindo a operação matemática. -> A solução  
  //console.log(transaction);

  transactions.push(transaction)

  init()

  upDateLocalStorage()
  
  inputTransactionName.value = ''
  inputTransactionAmount.value = ''
})


