const DOM = {
    quotes: document.querySelector('.quote'),
    categories: document.querySelector('#category')
};

DOM.categories.addEventListener('change', () => {
    const category = DOM.categories.value;
    if (category) {
        giveQuote(category);
    }
    else {
        giveQuoteZonderCat();
    }
});

async function giveQuote(category = '') {
    const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
    const resp = await fetch(url);
    if (!resp.ok) {
        console.log('mislukt');
        return;
    }
    const data = await resp.json();
    DOM.quotes.innerHTML = `${data.value}<cite>Chuck Norris</cite>`;
}

async function giveQuoteZonderCat() {
    const url = 'https://api.chucknorris.io/jokes/random';
    const resp = await fetch(url);
    if (!resp.ok) {
        console.log('mislukt');
        return;
    }
    const data = await resp.json();
    DOM.quotes.innerHTML = `${data.value}<cite>Chuck Norris</cite>`;
}

giveQuoteZonderCat();