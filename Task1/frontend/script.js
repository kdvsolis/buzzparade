// frontend/script.js
window.onload = async function() {
  try {
    const response = await fetch('/surveys');
    const surveys = await response.json();
    const surveysContainer = document.getElementById('surveys');
    surveys.forEach(survey => {
      const surveyDiv = document.createElement('div');
      surveyDiv.innerHTML = `
        <h2>${survey.title}</h2>
        <p>${survey.description}</p>
        <a href="/survey/${survey.id}">Take Survey</a>
      `;
      surveysContainer.appendChild(surveyDiv);
    });
  } catch (error) {
    console.error('Error fetching surveys:', error);
  }
};
