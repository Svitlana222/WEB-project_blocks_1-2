const form = document.getElementById('surveyForm');

// ������� ��� ��������� ����� � LocalStorage
function saveToLocalStorage() {
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach(function (value, key) {
        if (key === 'taxNews') {
            // ���� �������� - �����, �������� �� �
            formObject[key] = Array.isArray(formObject[key]) ? [...formObject[key], value] : [value];
        } else {
            formObject[key] = value;
        }
    });

    // �������� ��� � LocalStorage
    const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
    surveys.push(formObject);
    localStorage.setItem('surveys', JSON.stringify(surveys));
}

// �������� ��䳿 ������� �����
form.addEventListener('submit', function (event) {
    event.preventDefault();
    saveToLocalStorage();
    alert('Thank you for participating in the survey!');
    this.reset();
});

// ��������� �������� output ��� ��� range input
const rangeInput = document.getElementById('productQuality');
const outputValue = document.getElementById('productQualityValue');

rangeInput.addEventListener('input', function () {
    outputValue.textContent = this.value;
});

// ��������� ����� � LocalStorage
const surveys = JSON.parse(localStorage.getItem('surveys')) || [];

// ³���������� ���������, �� ���������� �������
function displayFilteredSurveys() {
    const emailFilter = document.getElementById('searchInput').value.trim().toLowerCase();
    const searchResultsContainer = document.getElementById('searchResults');
    if (searchResultsContainer) {
        searchResultsContainer.innerHTML = '';
    }

    if (emailFilter !== '') {
        const searchResults = surveys.filter(survey => {
            return survey.email && survey.email.toLowerCase().includes(emailFilter);
        });

        if (searchResults.length > 0) {
            const resultsList = document.createElement('ul');
            searchResults.forEach(result => {
                const listItem = document.createElement('li');
                listItem.textContent = JSON.stringify(result, null, 2);
                resultsList.appendChild(listItem);
            });
            searchResultsContainer.appendChild(resultsList);
        } else {
            const noResultsMessage = document.createElement('p');
            noResultsMessage.textContent = 'No results.';
            searchResultsContainer.appendChild(noResultsMessage);
        }
    }
}

// Գ�������� ��� ��� ������� � ��� ������
document.getElementById('searchInput').addEventListener('input', displayFilteredSurveys);

