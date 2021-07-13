var questions = [
    {
        subject: 'Commonly used data types do not include:',
        choices: ['strings', 'numbers', 'alerts', 'booleans'],
        answer: 'alerts'
    },
    {
        subject: 'the condition in an if / else statement is enclosed with ____.',
        choices: ['quotes, ""', 'curly brackets {}', 'parentheses ()', 'square brackets []'],
        answer: 'quotes, ""'
    },
    {
        subject: 'Arrays in Javascript can be used to store ____.',
        choices: ['booleans', 'more arrays', 'numbers and strings', 'all of the above'],
        answer: 'all of the above'
    },
    {
        subject: 'A useful tool used during development for debugging and printing content to the debugger is :',
        choices: ['for loops', 'console.log()', 'terminal / bash', 'Javascript'],
        answer: 'console.log()'
    }
];

// global vars
var score = 0;
var questionIndex = 0;

var countdown = document.querySelector('#countdown');
var timer = document.querySelector('#startBtn');
var questionsElement = document.querySelector('#questionsElement');
var wrapper = document.querySelector('#wrapper');

var seconds = 75;
var interval = 0;
// timer/score penalty
var penalty = 10;
// creates unordered list
var createList = document.createElement('ul');


// start timer on button click / shows display
timer.addEventListener('click', function() {
    if (interval === 0) {
        interval = setInterval(function () {
            seconds--;
            countdown.textContent = 'Time remaining: ' + seconds;

            if (seconds <=0) {
                clearInterval(interval);
                completed();
                countdown.textContent = "Time's Up"
            }
        }, 1000);
    }

    render(questionIndex);
});

function render(questionIndex) {
    // var userChoices = questions[questionIndex].choices
    // clear data
    questionsElement.innerHTML = '';
    createList.innerHTML = '';

    // loops all info in array
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].subject;
        var userChoices = questions[questionIndex].choices;
        questionsElement.textContent = userQuestion;
        // debugger;
    };
    
        // new el/choice for choices
        userChoices.forEach(function (newItem) {
            var listItem = document.createElement('li');
            listItem.textContent = newItem;
            questionsElement.appendChild(createList);
            createList.appendChild(listItem);
            listItem.addEventListener('click', (compare));
        });
       
};

function compare(event) {
    var element = event.target;

    if (element.matches('li')) {
        
        var createDiv = document.createElement('div');
        createDiv.setAttribute('id', 'createDiv');

        //if content of answer is = questions@index.answer, make div = correct answer
        if (element.textContent === questions[questionIndex].answer) {
            score++;
            createDiv.textContent = 'Correct! The answer is ' + questions[questionIndex].answer;
        } else {
            seconds = seconds - penalty;
            createDiv.textContent = 'Incorrect! The right answer is ' + questions[questionIndex].answer;
        }
    }

    // what number question user is @
    questionIndex++;

    if (questionIndex >= questions.length) {
        // completed appends final page with user stats
        completed();
        createDiv.textContent = 'This is the end of the quiz! ' + 'You got ' + score + '/' + questions.length + ' correct!';
    } else {
        render(questionIndex);
    }
    
    questionsElement.appendChild(createDiv);
    
};

function completed() {
    questionsElement.innerHTML = '';
    countdown.innerHTML = '';

    // heading
    var createH1 = document.createElement('h1');
    createH1.setAttribute('id', 'createH1');
    createH1.textContent = 'All Done!'

    questionsElement.appendChild(createH1);

    // paragraph
    var createP = document.createElement('p');
    createP.setAttribute('id', 'createP');

    questionsElement.appendChild(createP);

    //time remaining -> score
    if (seconds >= 0) {
        var timeRemaining = seconds;
        var createP2 = document.createElement('p');
        clearInterval(interval);
        createP.textContent = 'Your final score is: ' + timeRemaining;

        questionsElement.appendChild(createP2);
    }

    //label
    var createLabel = document.createElement('label');
    createLabel.setAttribute('id', 'createLabel');
    createLabel.textContent = 'Enter your initials';
    
    questionsElement.appendChild(createLabel);

    //input
    var createInput = document.createElement('input');
    createInput.setAttribute('type', 'text');
    createInput.setAttribute('id', 'initials');
    createInput.textContent = '';

    questionsElement.appendChild(createInput);
    
    //submit
    var createSubmit = document.createElement('button');
    createSubmit.setAttribute('type', 'submit');
    createSubmit.setAttribute('id', 'Submit');
    createSubmit.textContent = 'Submit';

    questionsElement.appendChild(createSubmit);

    // get initials store initials + score to local
    createSubmit.addEventListener('click', function() {
        var initials = createInput.value;

        if (initials === null) {
            console.log('No value entered')
            // createInput.value = 'Anonymous';

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);

            var allScores = localStorage.getItem('allScores');
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }

            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem('allScores', newScore);

            window.location.replace('./HighScores.html')
        }
    });
};
