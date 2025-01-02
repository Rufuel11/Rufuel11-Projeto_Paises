document.addEventListener("DOMContentLoaded", () => {
    const countriesGrid = document.getElementById("countries-grid");
    const regionFilter = document.getElementById("region");

    // Função para carregar países
    async function loadCountries(region = "all") {
        countriesGrid.innerHTML = `<p>Carregando países...</p>`;
        let url = "https://restcountries.com/v3.1/all";

        if (region !== "all") {
            url = `https://restcountries.com/v3.1/region/${region}`;
        }

        try {
            const response = await fetch(url);
            const countries = await response.json();

            displayCountries(countries);
        } catch (error) {
            countriesGrid.innerHTML = `<p>Erro ao carregar países.</p>`;
            console.error("Erro:", error);
        }
    }

    // Função para exibir países
    function displayCountries(countries) {
        countriesGrid.innerHTML = "";

        countries.forEach((country) => {
            const card = document.createElement("div");
            card.classList.add("country-card");

            card.innerHTML = `
                <img src="${country.flags.png}" alt="Bandeira de ${country.name.common}">
                <h3>${country.name.common}</h3>
                <p>Região: ${country.region}</p>
                <p>População: ${country.population.toLocaleString()}</p>
                <button onclick="addToFavorites('${country.name.common}')">Favoritar</button>
            `;

            countriesGrid.appendChild(card);
        });
    }

    // Função para adicionar favoritos ao localStorage
    window.addToFavorites = (countryName) => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!favorites.includes(countryName)) {
            favorites.push(countryName);
            localStorage.setItem("favorites", JSON.stringify(favorites));
            alert(`${countryName} foi adicionado aos favoritos!`);
        } else {
            alert(`${countryName} já está nos favoritos.`);
        }
    };

    // Carregar todos os países ao iniciar
    loadCountries();

    // Filtrar por região
    regionFilter.addEventListener("change", (e) => {
        loadCountries(e.target.value);
    });
});
