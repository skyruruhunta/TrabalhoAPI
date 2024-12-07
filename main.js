import { loadCountries } from './modules/fetchCountries.js';
import { handleApiForm } from './modules/brasilAPI.js';

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
  loadCountries(); // Carrega os países do arquivo JSON

  const apiForm = document.getElementById('api-form');
  apiForm.addEventListener('submit', handleApiForm); // Lida com o formulário de consulta à Brasil API
});