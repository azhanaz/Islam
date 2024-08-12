const quizData = [
    {
        question: 'What is the name of the holy book of Islam?',
        options: ['Bible', 'Torah', 'Quran', 'Vedas'],
        answer: 'Quran',
    },
    {
        question: 'Who is considered the last prophet in Islam?',
        options: ['Prophet Musa (Moses)', 'Prophet Isa (Jesus)', 'Prophet Ibrahim (Abraham)', 'Prophet Muhammad'],
        answer: 'Prophet Muhammad',
    },
    {
        question: 'How many pillars of Islam are there?',
        options: ['Three', 'Four', 'Five', 'Six'],
        answer: 'Five',
    },
    {
        question: 'In which month do Muslims fast from dawn to sunset?',
        options: ['Rajab', 'Ramadan', 'Shawwal', 'Dhul-Hijjah'],
        answer: 'Ramadan',
    },
    {
        question: 'What is the Islamic term for the pilgrimage to Mecca?',
        options: ['Umrah', 'Hajj', 'Zakat', 'Sawm'],
        answer: 'Hajj',
    },
    {
        question: 'Which direction do Muslims face when they pray?',
        options: ['North', 'South', 'East', 'Qibla (towards Kaaba)'],
        answer: 'Qibla (towards Kaaba)',
    },
    {
        question: 'Which angel is known for delivering messages from Allah to the prophets?',
        options: ['Angel Jibril (Gabriel)', 'Angel Mikail (Michael)', 'Angel Israfil', 'Angel Azrael'],
        answer: 'Angel Jibril (Gabriel)',
    },
    {
        question: 'What is the name of the first man created by Allah?',
        options: ['Nuh (Noah)', 'Musa (Moses)', 'Adam', 'Yusuf (Joseph)'],
        answer: 'Adam',
    },
    {
        question: 'Which prayer is performed after sunset?',
        options: ['Fajr', 'Dhuhr', 'Maghrib', 'Isha'],
        answer: 'Maghrib',
    },
    {
        question: 'What is the name of the night on which the Quran was first revealed?',
        options: ['Laylat al-Qadr', 'Laylat al-Isra', 'Laylat al-Baraat', 'Laylat al-Miraj'],
        answer: 'Laylat al-Qadr',
    },
    {
        question: 'How many children did the Prophet (s.a.w) have?',
        options: ['Three', 'Five', 'Seven', 'Six'],
        answer: 'Seven',
    },
    {
        question: 'How many times did the Prophet (s.a.w) perform Hajj?',
        options: ['Once', 'Twice', 'Three times', 'Four times'],
        answer: 'Once',
    },
    {
        question: 'What is the name of the Prophet\'s (s.a.w) mother?',
        options: ['Aminah', 'Khadijah', 'Fatimah', 'Aisha'],
        answer: 'Aminah',
    },
    {
        question: 'Who is the first man to accept Islam?',
        options: ['Abu Bakr', 'Ali', 'Umar', 'Uthman'],
        answer: 'Abu Bakr',
    },
    {
        question: 'Who is the first child to accept Islam?',
        options: ['Hasan', 'Husayn', 'Ali', 'Zayd'],
        answer: 'Ali',
    },
    {
        question: 'Who is the first woman to accept Islam?',
        options: ['Aisha', 'Fatimah', 'Khadijah', 'Hafsa'],
        answer: 'Khadijah',
    },
];


const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
        score++;
    } else {
        incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
        });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        displayResult();
    }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
        <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
    `;
    }

    resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();