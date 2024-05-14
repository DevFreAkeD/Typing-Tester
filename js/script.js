const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.card-body .input-field');
const time = document.querySelector('.time span b');
const wpm = document.querySelector('.wpm span');
const mistake = document.querySelector('.mistake span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button')
const tryAgainButton = document.getElementById('try-again-button');

let timer;
let maxTime = 120;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = 0;

function loadParagraph() {
    
    console.log("Loading paragraph...");
    const paragraph = [
        "Bootstrap, a leading front-end framework, streamlines website development with its array of tools and pre-designed components. Renowned for its responsiveness and mobile-first approach, Bootstrap empowers developers to create visually appealing and user-friendly interfaces efficiently. Its grid system facilitates layout structuring, ensuring consistency across devices. Additionally, Bootstraps extensive CSS styles and JavaScript plugins enhance functionality without sacrificing design integrity. By providing a robust foundation, Bootstrap accelerates the development process, enabling rapid prototyping and seamless integration. As a result, it remains a cornerstone in the web development community, favored for its versatility and ability to produce high-quality, professional-grade websites.",
        "Artificial Intelligence (AI) revolutionizes industries and daily life, leveraging algorithms and data to mimic human intelligence. In healthcare, AI aids diagnosis and treatment plans, enhancing precision and efficiency. Industries utilize AI for predictive analytics, optimizing processes, and improving decision-making. In finance, AI powers trading algorithms, risk assessment, and fraud detection. Autonomous vehicles rely on AI for navigation and safety. Natural Language Processing (NLP) facilitates human-computer interaction, enabling virtual assistants like chatbots and voice-controlled devices. However, ethical concerns surround AI, including privacy breaches, job displacement, and biases in decision-making algorithms. As AI continues to evolve, balancing innovation with ethical considerations becomes paramount, ensuring its benefits are accessible and equitable for all.",
        "Cloud computing revolutionizes the way businesses and individuals access and manage computing resources. It entails the delivery of computing services, including storage, servers, databases, networking, software, and analytics, over the internet(cloud) on a pay-as-you-go basis. This model eliminates the need for organizations to invest in and maintain physical infrastructure, reducing costs and improving scalability and flexibility. Cloud computing offers various deployment models, including public, private, and hybrid clouds, catering to diverse needs and preferences. Public clouds, such as those provided by Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP), offer resources to multiple users over the internet. Private clouds, on the other hand, are dedicated to a single organization, providing greater control and customization options. Hybrid clouds combine elements of both public and private clouds, enabling seamless data and application portability. Key benefits of cloud computing include agility, as resources can be provisioned and scaled rapidly to meet fluctuating demand, and accessibility, as users can access services from anywhere with an internet connection. Additionally, cloud computing facilitates collaboration, innovation, and disaster recovery. However, challenges such as security, compliance, and vendor lock-in require careful consideration and management to maximize the advantages of cloud computing while mitigating risks.",
        "Next.js is a versatile open-source React framework that enables efficient and scalable web development. Built upon React and Node.js, it offers a streamlined approach to building server-side rendered (SSR) and statically generated (SSG) websites and applications. Next.js simplifies complex tasks like routing, code splitting, and data fetching, enhancing developer productivity. With features like automatic code splitting, Next.js optimizes performance by loading only the necessary JavaScript for each page, resulting in faster load times and improved user experience. Its built-in support for server-side rendering allows for better SEO and faster initial page loads, crucial for modern web applications. Next.js also offers a dynamic and flexible data fetching mechanism, enabling developers to fetch data at build time, request time, or even client-side. This flexibility empowers developers to create dynamic and interactive applications while maintaining optimal performance. Moreover, Next.js provides comprehensive support for modern web technologies like TypeScript, CSS-in-JS, and API routes, ensuring developers have the tools they need to build robust and maintainable applications. Overall, Next.js simplifies the complexities of web development, offering a powerful and efficient framework for building modern web applications with React.",
        "Power Rangers Dino Thunder is the tenth season of the long-running Power Rangers franchise, airing in 2004. The series follows a group of high school students who gain dinosaur-themed powers to protect the Earth from evil forces. Set in the fictional city of Reefside, the story begins when three teenagers, Conner, Ethan, and Kira, stumble upon mysterious Dino Gems, granting them the abilities of the Red, Blue, and Yellow Dino Rangers, respectively. They are soon joined by Dr. Tommy Oliver, a former Power Ranger himself, who becomes the Black Dino Ranger and mentors the new team. Their mission is to stop the villainous Mesogog, a scientist turned mutant dinosaur, and his army of evil minions from unleashing chaos and destruction upon the world. Mesogog's plans involve resurrecting the ancient dinosaur warriors known as the Tyrannodrones and unleashing genetically modified creatures called Bio Zords. Throughout the series, the Rangers face various challenges, both in their personal lives and in battle, as they learn to work together as a team and harness the power of their Dino Gems. With epic battles, thrilling adventures, and moral lessons, Power Rangers Dino Thunder entertains audiences of all ages with its action-packed storyline and colorful characters."
    ];

    const randomIndex = Math.floor(Math.random() * paragraph.length);
    console.log("Random index:", randomIndex);
    typingText.innerHTML = '';
    for (const char of paragraph[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`;
    }
    console.log("Paragraph loaded:", typingText.innerHTML);
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', () => input.focus());
    typingText.addEventListener("click", () => { input.focus() });
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
            mistakes++; // Increment mistake count
            char[charIndex].classList.add('incorrect');
            console.log("Incorrect");
            
            // Reset classes of subsequent characters
            for (let i = charIndex + 1; i < char.length; i++) {
                char[i].classList.remove('correct');
                char[i].classList.remove('incorrect');
            }
        }
        charIndex++;
        char[charIndex].classList.add('active');
        
        // Update mistake count
        mistake.innerText = mistakes;
        
        // Calculate CPM
        const cpmVal = Math.round((charIndex / (maxTime - timeLeft)) * 60); // characters per minute
        cpm.innerText = cpmVal;
    } else {
        clearInterval(timer);
        input.value = '';
    }
}

function initTime() {
    if (timeLeft > 0) {
        timeLeft--; // Decrease timeLeft instead of time
        time.innerText = timeLeft;
        const wpmVal = Math.round(((charIndex - mistakes) / 5) * ((maxTime - timeLeft) / 60)); // Corrected formula
        wpm.innerText = wpmVal;
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
    mistake.innerText = 0; // mistakes count value  to 0
    isTyping = false; // set isTying false.
    wpm.innerText = 0; // set wpm value to 0
    cpm.innerText = 0; // set cpm value to 0
}

tryAgainButton.addEventListener('click', function() {
    tryAgainButton.textContent = "...";     // Change button text to "Trying Again..."
    setTimeout(function() {
        // After a delay, change button text back to "Try Again"
        tryAgainButton.textContent = "Try Again";
    }, 1000); // Change 2000 to the duration of your try again process in milliseconds
});

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);
loadParagraph();
