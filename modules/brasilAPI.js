import { isFieldEmpty, displayError, displaySuccess, clearElementContent } from './helpers.js';

export async function handleApiForm(event) {
  event.preventDefault();
  const queryInput = document.getElementById('query');
  let query = queryInput.value.trim(); 

  query = query.replace(/[^\d]/g, ''); 

  const resultsDiv = document.getElementById('api-results'); 

  if (isFieldEmpty(query)) {
    displayError('Por favor, insira uma consulta válida.', 'api-results');
    return;
  }

  const isValidCep = query.match(/^\d{8}$/);
  const isValidCnpj = query.match(/^\d{14}$/);

  if (!isValidCep && !isValidCnpj) {
    displayError('Por favor, insira um CEP ou CNPJ válido.', 'api-results');
    return;
  }

  try {
    clearElementContent('api-results'); 

    const apiBaseUrl = 'https://brasilapi.com.br/api';
    let fullUrl = '';

    if (isValidCep) {
      fullUrl = `${apiBaseUrl}/cep/v1/${query}`;
    } else if (isValidCnpj) {
      fullUrl = `${apiBaseUrl}/cnpj/v1/${query}`;
    }

    const response = await fetch(fullUrl);

    if (response.status === 400) {
      displayError('CNPJ inválido ou não encontrado.', 'api-results');
      return;
    }

    if (!response.ok) {
      displayError('Erro ao consultar a API. Verifique sua entrada e tente novamente.', 'api-results');
      return;
    }

    const data = await response.json();

    if (!data || (data.error && data.error === 'CNPJ não encontrado')) {
      displayError('CNPJ ou CEP inválido ou não encontrado.', 'api-results');
      return;
    }

    displaySuccess('Consulta realizada com sucesso!', 'api-results');
    
    let resultHtml = '<ul>';

    if (data.cnpj) {
      resultHtml += `
        <li><strong>Razão Social:</strong> ${data.razao_social}</li>
        <li><strong>Nome Fantasia:</strong> ${data.nome_fantasia || 'Não disponível'}</li>
        <li><strong>CNPJ:</strong> ${data.cnpj}</li>
        <li><strong>Endereço:</strong> ${data.logradouro}, ${data.numero}, ${data.bairro}, ${data.cidade} - ${data.estado}</li>
        <li><strong>Situação Cadastral:</strong> ${data.situacao_cadastral}</li>
      `;
    } else if (data.cep) {
      resultHtml += `
        <li><strong>Logradouro:</strong> ${data.street || 'Não disponível'}</li>
        <li><strong>Bairro:</strong> ${data.neighborhood || 'Não disponível'}</li>
        <li><strong>Cidade:</strong> ${data.city || 'Não disponível'}</li>
        <li><strong>Estado:</strong> ${data.state || 'Não disponível'}</li>
      `;
    }

    resultHtml += '</ul>';
    resultsDiv.innerHTML += resultHtml;
  } catch (error) {
    displayError('Erro ao consultar a API. Verifique sua entrada e tente novamente.', 'api-results');
  }
}