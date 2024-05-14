const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.card-body .input-field');
const time = document.querySelector('.time span b');
const wpm = document.querySelector('.wpm span');
const mistake = document.querySelector('.mistake span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button')

let timer;
let maxTime = 120;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = 0;

function loadParagraph() {
    
    console.log("Loading paragraph...");
    const paragraph = [
        "Bootstrap, a leading front-end framework, streamlines website development with its array of tools and pre-designed components.",
        "Renowned for its responsiveness and mobile-first approach, Bootstrap empowers developers to create visually appealing and user-friendly interfaces efficiently.",
        "Its grid system facilitates layout structuring, ensuring consistency across devices.",
        "Additionally, Bootstrap's extensive CSS styles and JavaScript plugins enhance functionality without sacrificing design integrity.",
        "By providing a robust foundation, Bootstrap accelerates the development process, enabling rapid prototyping and seamless integration.",
        "As a result, it remains a cornerstone in the web development community, favored for its versatility and ability to produce high-quality, professional-grade websites."
    ];

    const randomIndex = Math.floor(Math.random() * paragraph.length);
    console.log("Random index:", randomIndex);
    typingText.innerHTML = '';
    for (const char of paragraph[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`;
    }
    console.log("Paragraph loaded:", typingText.innerHTML);
    typingText.querySelectorAll('span')[0].classList.add('active');
}

function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    if (charIndex < char.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }
        if (char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct');
            console.log("Correct");
        } else {
            mistakes++; //increment mistake count when incorrect word typed
            char[charIndex].classList.add('incorrect');
            console.log("Incorrect");
        }
        mistake.innerText = mistakes; // update mistakes count.
        charIndex++;
        char[charIndex].classList.add('active');
    }
    clearInterval(timer);
    input.value = '';
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--; // Decrease timeLeft instead of time
        time.innerText = timeLeft;
    } else {
        clearInterval(timer);
    }
}

function reset() {
    loadParagraph(); // load new paragraph.
    clearInterval(timer); // clear timer.
    timeLeft = maxTime; // set timeLeft to maxTime.
    time.innerText = timeLeft; // set timeLeft text back to maxTime.
    input.value = ''; // reset input values
    charIndex = 0; // reset charIndex value back to 0
    mistakes = 0; // set mistakes to 0
    mistake.innerText = 0; // mistakes count text to 0
    isTyping = false; // set isTying false.
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);
loadParagraph();
