const expenseForm = document.getElementById('expense-form');
const expenseAmount = document.getElementById('expense-amount');
const expenseDescription = document.getElementById('expense-description');

const incomeForm = document.getElementById("income-form")
const incomeAmount = document.getElementById('income-amount');
const incomeDescription = document.getElementById('income-description');



const transactionList = document.getElementById('transaction-history');
const totalExpense = document.getElementById('total-expenses');
const totalIncome = document.getElementById('total-income');
const balance = document.getElementById('balance');


incomeForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const description = incomeDescription.value.trim();
    const amount = parseFloat(incomeAmount.value.trim());
    const type = event.target.name;
    
    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid income description and amount.');
        return;
    }

    addTransaction(description, amount,type);
    updateSummary();
    clearInputs();
});

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const description = expenseDescription.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());
    const type = event.target.name;
    
    if (description === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid expense description and amount.');
        return;
    }

    addTransaction(description, amount,type);
    updateSummary();
    clearInputs();
});

function addTransaction(description, amount, type) {
    const transactionRow = document.createElement('tr');

    transactionRow.innerHTML = `
        <td>${description}</td>
        <td>${amount.toFixed(2)}</td>
        <td>${type}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    transactionList.appendChild(transactionRow);

    transactionRow.querySelector('.delete-btn').addEventListener('click', function() {
        transactionRow.remove();
        updateSummary();
    });
}

function updateSummary() {
    let totalExpenses = 0;
    let totalIncomes = 0;

    const transactions = transactionList.querySelectorAll('tr');

    transactions.forEach(function(transaction) {
        const amount = parseFloat(transaction.children[1].textContent);
        const type = transaction.children[2].textContent

        if (type === 'INCOME') {
            totalIncomes += amount;
        } else {
            totalExpenses += amount;
        }
    });

    totalExpense.textContent = totalExpenses.toFixed(2);
    totalIncome.textContent = totalIncomes.toFixed(2);
    balance.textContent = (totalIncomes - totalExpenses).toFixed(2);
}

function clearInputs() {
    expenseAmount.value = '';
    expenseDescription.value = '';
    incomeAmount.value = '';
    incomeDescription.value = '';
}