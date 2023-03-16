const DOM = {
    quotes: document.querySelector('.quote')
};

async function giveQuote() {
    const url = 'https://api.chucknorris.io/jokes/random';
    const resp = await fetch(url);
    if (!resp.ok) {
        console.log('mislukt');
        return;
    }

    const data = await resp.json();
    DOM.quotes.innerHTML = data.value;
}

giveQuote();