// index.js

async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const data = await response.json();
    return data;
}

function renderData(countries) {
    const container = document.getElementById('countries-container');
    container.innerHTML = '';

    countries.forEach(country => {
        const card = document.createElement('div');
        card.classList.add('card');

        const flagImg = document.createElement('img');
        flagImg.src = country.flags.svg;
        flagImg.alt = `${country.name.common} flag`;

        const name = document.createElement('p');
        name.textContent = country.name.common;

        const population = document.createElement('p');
        population.textContent = `Population: ${country.population}`;

        const region = document.createElement('p');
        region.textContent = `Region: ${country.region}`;

        const capital = document.createElement('p');
        capital.textContent = `Capital: ${country.capital}`;

        card.appendChild(flagImg);
        card.appendChild(name);
        card.appendChild(population);
        card.appendChild(region);
        card.appendChild(capital);

        container.appendChild(card);
    });
}

function sortLogic(countries, order) {
    return countries.sort((a, b) => {
        const populationA = a.population || 0;
        const populationB = b.population || 0;

        if (order === 'asc') {
            return populationA - populationB;
        } else {
            return populationB - populationA;
        }
    });
}

function filterByLogic(countries, region) {
    if (region === 'all') {
        return countries;
    } else {
        return countries.filter(country => country.region === region);
    }
}

function handleSortAndFilter() {
    const sortSelect = document.getElementById('sort');
    const filterSelect = document.getElementById('filter');

    const sortValue = sortSelect.value;
    const filterValue = filterSelect.value;

    fetchCountries()
        .then(data => {
            let filteredData = filterByLogic(data, filterValue);
            filteredData = sortLogic(filteredData, sortValue);
            renderData(filteredData);
        })
        .catch(error => console.error('Error fetching countries:', error));
}

// Initial render
handleSortAndFilter();
