function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

let incomeData = getFromLocalStorage('incomeData');

function addIncome() {
    const date = document.getElementById('income-date').value;
    const source = document.getElementById('income-source').value;
    const amount = parseFloat(document.getElementById('income-amount').value);

    if (!date || !source || isNaN(amount)) {
        alert('Заполните все поля корректно!');
        return;
    }

    const newIncome = {
        id: Date.now(),
        date: date,
        source: source,
        amount: amount,
        completed: false
    };

    incomeData.push(newIncome);
    saveToLocalStorage('incomeData', incomeData);
    renderIncomeList();
    clearIncomeForm();
}

function renderIncomeList() {
    const list = document.getElementById('income-list');
    list.innerHTML = '';

    incomeData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(item.date)}</td>
            <td>${item.source}</td>
            <td>${item.amount.toLocaleString()} ₽</td>
            <td>
                <input type="checkbox" class="select-item" data-id="${item.id}">
                <button onclick="toggleComplete('income', ${item.id})">
                    ${item.completed ? 'Восстановить' : 'Выполнено'}
                </button>
            </td>
        `;
        if (item.completed) {
            row.style.opacity = '0.6';
            row.style.textDecoration = 'line-through';
        }
        list.appendChild(row);
    });
}

let expenseData = getFromLocalStorage('expenseData');

function addExpense() {
    const date = document.getElementById('expense-date').value;
    const category = document.getElementById('expense-category').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (!date || !category || isNaN(amount)) {
        alert('Заполните все поля корректно!');
        return;
    }

    const newExpense = {
        id: Date.now(),
        date: date,
        category: category,
        amount: amount,
        completed: false
    };

    expenseData.push(newExpense);
    saveToLocalStorage('expenseData', expenseData);
    renderExpenseList();
    clearExpenseForm();
}

function renderExpenseList() {
    const list = document.getElementById('expense-list');
    list.innerHTML = '';

    expenseData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${formatDate(item.date)}</td>
            <td>${item.category}</td>
            <td>${item.amount.toLocaleString()} ₽</td>
            <td>
                <input type="checkbox" class="select-item" data-id="${item.id}">
                <button onclick="toggleComplete('expense', ${item.id})">
                    ${item.completed ? 'Восстановить' : 'Выполнено'}
                </button>
            </td>
        `;
        if (item.completed) {
            row.style.opacity = '0.6';
            row.style.textDecoration = 'line-through';
        }
        list.appendChild(row);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

function toggleComplete(type, id) {
    const data = type === 'income' ? incomeData : expenseData;
    const item = data.find(item => item.id === id);
    
    if (item) {
        item.completed = !item.completed;
        saveToLocalStorage(type + 'Data', data);
        type === 'income' ? renderIncomeList() : renderExpenseList();
    }
}

function deleteSelected(type) {
    const checkboxes = document.querySelectorAll(`#${type}-list .select-item:checked`);
    const idsToDelete = Array.from(checkboxes).map(cb => parseInt(cb.dataset.id));
    
    if (idsToDelete.length === 0) {
        alert('Выберите элементы для удаления!');
        return;
    }

    if (confirm(`Удалить ${idsToDelete.length} выбранных элементов?`)) {
        if (type === 'income') {
            incomeData = incomeData.filter(item => !idsToDelete.includes(item.id));
            saveToLocalStorage('incomeData', incomeData);
            renderIncomeList();
        } else {
            expenseData = expenseData.filter(item => !idsToDelete.includes(item.id));
            saveToLocalStorage('expenseData', expenseData);
            renderExpenseList();
        }
    }
}

function clearIncomeForm() {
    document.getElementById('income-date').value = '';
    document.getElementById('income-source').value = '';
    document.getElementById('income-amount').value = '';
}

function clearExpenseForm() {
    document.getElementById('expense-date').value = '';
    document.getElementById('expense-category').value = 'Аренда';
    document.getElementById('expense-amount').value = '';
}

function loadIncomeData() {
    incomeData = getFromLocalStorage('incomeData');
    renderIncomeList();
}

function loadExpenseData() {
    expenseData = getFromLocalStorage('expenseData');
    renderExpenseList();
}
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(reg => console.log('Service Worker зарегистрирован'))
      .catch(err => console.log('Ошибка:', err));
  });
}