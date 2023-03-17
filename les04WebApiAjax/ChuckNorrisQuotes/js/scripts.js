const DOM = {
    quotes: document.querySelector('.quote'),
    categories: document.querySelector('#category'),
    img: document.querySelector('#imgSrc')
};

async function getCategories() {
    const url = 'https://api.chucknorris.io/jokes/categories';
    const resp = await fetch(url);
    if (!resp.ok) return console.log('mislukt');
    const categoriesSelect = await resp.json();
    let optionsHTML = '<option value="">--Select a category--</option>';
    for (let i = 0; i < categoriesSelect.length; i++) {
      optionsHTML += '<option value="' + categoriesSelect[i] + '">' + categoriesSelect[i] + '</option>';
    }
    DOM.categories.innerHTML = optionsHTML;
}

async function giveQuote(category = '') {
    const url = category ? `https://api.chucknorris.io/jokes/random?category=${category}` : 'https://api.chucknorris.io/jokes/random';
    const resp = await fetch(url);
    if (!resp.ok) return console.log('mislukt');
    const data = await resp.json();
    DOM.quotes.innerHTML = `${data.value}<cite>Chuck Norris</cite>`;
    DOM.img.src = data.icon_url;
}

DOM.categories.addEventListener('change', () => {
    const category = DOM.categories.value;
    giveQuote(category);
});

getCategories();
giveQuote();