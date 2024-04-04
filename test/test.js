const testData = {
    "testName": "Test about Drinks and Desserts",
    "questions": [
        {
            "question": "Which beverage is typically made with espresso, hot milk, and milk foam?",
            "answers": [
                {
                    "answer": "Americano",
                    "isCorrect": false
                },
                {
                    "answer": "Latte",
                    "isCorrect": true
                },
                {
                    "answer": "Cappuccino",
                    "isCorrect": false
                },
                {
                    "answer": "Mochaccino",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "What is the characteristic feature of cappuccino compared to other coffee drinks?",
            "answers": [
                {
                    "answer": "It contains the most milk",
                    "isCorrect": false
                },
                {
                    "answer": "It has milk foam on top",
                    "isCorrect": true
                },
                {
                    "answer": "It has the highest amount of caffeine",
                    "isCorrect": false
                },
                {
                    "answer": "It is always served with ice",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which beverage usually has the highest caffeine content per serving?",
            "answers": [
                {
                    "answer": "Latte",
                    "isCorrect": false
                },
                {
                    "answer": "Americano",
                    "isCorrect": false
                },
                {
                    "answer": "Espresso",
                    "isCorrect": true
                },
                {
                    "answer": "Cappuccino",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which dessert typically contains layers of chocolate sponge cake soaked in coffee and mascarpone cream?",
            "answers": [
                {
                    "answer": "Cheesecake",
                    "isCorrect": false
                },
                {
                    "answer": "Tiramisu",
                    "isCorrect": true
                },
                {
                    "answer": "Mousse",
                    "isCorrect": false
                },
                {
                    "answer": "Eclair",
                    "isCorrect": false
                }
            ]
        },
        {
            "question": "Which dessert often contains carrots, nuts, and spices?",
            "answers": [
                {
                    "answer": "Brownie",
                    "isCorrect": false
                },
                {
                    "answer": "Fruit tart",
                    "isCorrect": false
                },
                {
                    "answer": "Carrot cake",
                    "isCorrect": true
                },
                {
                    "answer": "Chocolate cake",
                    "isCorrect": false
                }
            ]
        }
    ]
};


const questionsContainer = document.getElementById('questions-container');
const submitButton = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');

// Відображення питань та відповідей
function displayQuestions() {
    testData.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<h3>Question ${index + 1}: ${question.question}</h3>`;

        question.answers.forEach((answer, answerIndex) => {
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('answer');
            answerDiv.innerHTML = `
                <input type="radio" id="answer-${index}-${answerIndex}" name="answer-${index}" value="${answerIndex}">
                <label for="answer-${index}-${answerIndex}">${answer.answer}</label>
            `;
            questionDiv.appendChild(answerDiv);
        });

        questionsContainer.appendChild(questionDiv);
    });
}

// Перевірка правильності відповідей та виведення результату
function checkAnswers() {
    let correctAnswers = 0;
    testData.questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="answer-${index}"]:checked`);
        if (selectedAnswer) {
            const selectedAnswerIndex = selectedAnswer.value;
            const selectedAnswerElement = document.getElementById(`answer-${index}-${selectedAnswerIndex}`);
            if (question.answers[selectedAnswerIndex].isCorrect) {
                correctAnswers++;
                selectedAnswerElement.nextElementSibling.style.color = 'green';
            } else {
                selectedAnswerElement.nextElementSibling.style.color = 'red';
            }
        }
        // Відображення правильних відповідей
        question.answers.forEach((answer, answerIndex) => {
            const answerElement = document.getElementById(`answer-${index}-${answerIndex}`);
            if (answer.isCorrect) {
                answerElement.nextElementSibling.style.color = 'green';
            }
            // Відключення радіо-кнопок
            answerElement.disabled = true;
        });
    });
    const totalQuestions = testData.questions.length;
    const score = (correctAnswers / totalQuestions) * 100;
    resultDiv.textContent = `You answered correctly ${correctAnswers} out of ${totalQuestions} questions. Your score: ${score}%`;

}

// Відображення питань при завантаженні сторінки
window.onload = () => {
    displayQuestions();
};

// Обробник події кнопки "Завершити тест"
submitButton.addEventListener('click', () => {
    checkAnswers();
});
