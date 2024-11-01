const transactionUl = document.querySelector("#transactions");  // O # serve para acessar um objeto expecifico no index por meio do  comando "querySelector"
//console.log(transactionUl);

const dummyTransactions = [
  { id: 1, name: "Bolo de brigadeiro", amount: -20 },  //amount é o valor, que nesse caso significa despesa por estar negativo
  { id: 2, name: "Salário", amount: 300 },
  { id: 3, name: "Torta de limão", amount: -10 },
  { id: 4, name: "Bateria", amount: 150 },
];

const addTransactionIntoDOM = (transaction) => {
  const operator = transaction.amount < 0 ? "-" : "+";  // é um IF ELSE reduzido sendo '?' o IF e o ':' o ELSE então se t.amount for menor se 0 vai ser '-' se não for será '+'
  const CSSClass = transaction.amount < 0 ? "minus" : "plus";
  const amountWithoutOperator = Math.abs(transaction.amount);
  const li = document.createElement("li");

  li.classList.add(CSSClass);
  li.innerHTML = `
        ${transaction.name} <span> ${operator} R$ ${amountWithoutOperator}</span><button class="delete-btn">x</button>  `; //Serve para pegar a penas o valor absoluto, ou seja, sem os sinais (- ou +)

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

// addTransactionIntoDOM(dummyTransactions[0]);
// addTransactionIntoDOM(dummyTransactions[1]);

const updateBalanceValues = () => {
    const transactionsAmounts = dummyTransactions.map(
      (transaction) => transaction.amount
    ); //O map nesse caso permite que manipulemos somente os atributos necessários para que realizemos o cálculo
    const total = transactionsAmounts.reduce((acumulator, transaction) => acumulator + transaction, 0).toFixed(2); //soma e reduz os elementos do array em somente um
    const income = transactionsAmounts
    .filter((value) => value > 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
    console.log(income)

    const total2 = transactionsAmounts.reduce((acumulator, transaction) => acumulator + transaction, 0).toFixed(2);
    const income2 = transactionsAmounts
    .filter((value) => value < 0)
    .reduce((accumulator, value) => accumulator + value, 0)
    .toFixed(2);
    console.log(income2)
  };
  

const init = () => {
  dummyTransactions.forEach(addTransactionIntoDOM);
  updateBalanceValues();
};


init();

