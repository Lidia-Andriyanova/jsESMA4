// Необходимо получить список всех пользователей с помощью бесплатного API (https://jsonplaceholder.typicode.com/users) и отобразить их на странице. Пользователь должен иметь возможность удалить любого пользователя из списка. Данные при получении необходимо сохранить в локальное хранилище браузера localStorage. При удалении пользователь должен удаляться не только со страницы, но и из локального хранилища localStorage

const usersURL = 'https://jsonplaceholder.typicode.com/users';

const getData = async(usersURL) => {
    const res = await fetch(usersURL);
    const data = await res.json();
    return data;
}

const div = document.querySelector('.users');

try {
    const data = await getData(usersURL);

    data.forEach((element) => {
        div.insertAdjacentHTML('beforeend', 
        `
        <div class="user" id="div${element.id}">
        <h2 class="name">${element.name}</h2>
        <p class="phone">${element.phone}</p>
        <p class="email">${element.email}</p>
        <h3 class="company">${element.company.name}</h3>
        <p class="phrase">"${element.company.catchPhrase}"</p>
        <button class="delete" id="${element.id}">Удалить</button>
      </div>
        `);
        localStorage.setItem(element.id, JSON.stringify(element));
    });

    const btns = document.querySelectorAll('.delete');
    btns.forEach(btn => {
         btn.addEventListener('click', () => {
            localStorage.removeItem(btn.id);
            let div = document.getElementById(`div${btn.id}`);
            div.remove();
         })
    })

} catch (error) {
    console.error('Что-то пошло не так')    
}

