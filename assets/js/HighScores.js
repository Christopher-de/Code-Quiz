let highScore = document.querySelector('#highScore');
let clear = document.querySelector('#clear');
let goBack = document.querySelector('#return');

clear.addEventListener('click',function() {
    localStorage.clear();
    location.reload();
});

let allScores = localStorage.getItem('allScores');
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (let i = 0; i < allScores.length; i++) {
        let createLi = document.createElement('li');
        createLi.textContent = allScores[i].initials + ' ' + allScores[i].score;
        highScore.appendChild(createLi) ;
    }
}

goBack.addEventListener('click', function() {
    location.replace('./index.html')
});