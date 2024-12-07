export function isFieldEmpty(value) {
    return value.trim() === '';
  }
  
  export function capitalize(word) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  export function displayError(message, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `<p style="color: red;">${message}</p>`;
    }
  }

  export function displaySuccess(message, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `<p style="color: green;">${message}</p>`;
    }
  }
 
  export function clearElementContent(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = '';
    }
  }  