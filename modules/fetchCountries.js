import { displayError, clearElementContent, capitalize } from './helpers.js';

export async function loadCountries() {
  const select = document.getElementById('country-select');
  const detailsDiv = document.getElementById('country-details');
  try {
    const response = await fetch('./paises.json'); 
    if (!response.ok) throw new Error('Erro ao carregar países.');

    const countries = await response.json();

    const options = countries
      .map(country => `<option value="${country.nome_pais}">${capitalize(country.nome_pais)}</option>`)
      .join('');

    select.innerHTML = `<option value="">Selecione um país...</option>` + options;

    select.addEventListener('change', () => {
      const selectedCountry = countries.find(country => country.nome_pais === select.value); 
      if (selectedCountry) {
        displayCountryDetails(selectedCountry, detailsDiv);
      } else {
        clearElementContent('country-details');
      }
    });

  } catch (error) {
    console.error('Erro:', error);
    displayError('Erro ao carregar os países. Tente novamente mais tarde.', 'country-details');
    select.innerHTML = `<option value="">Erro ao carregar países.</option>`;
  }
}

function displayCountryDetails(country, element) {
  element.innerHTML = `
    <h3>${capitalize(country.nome_pais)}</h3>
    <p><strong>Gentílico:</strong> ${capitalize(country.gentilico)}</p>
    <p><strong>Sigla:</strong> ${country.sigla}</p>
    <p><strong>Nome Internacional:</strong> ${country.nome_pais_int}</p>
  `;
}