const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.card-body .input-field');
const time = document.querySelector('.time span b');
const wpm = document.querySelector('.wpm span');
const mistake = document.querySelector('.mistake span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button')

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

btn.addEventListener("click", reset);
loadParagraph();
