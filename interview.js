var volumeOnIntro = false;
function changeImageIntro() {
    if (volumeOnIntro) {
        document.getElementById('vol-intro').src = "img/mute.png";
        volumeOnIntro = false;
    }
    else {
        document.getElementById('vol-intro').src = "img/volume.png";
        volumeOnIntro = true;
    }
}

var volumeOnTip = false;
function changeImageTip() {
    if (volumeOnTip) {
        document.getElementById('vol-tip').src = "img/mute.png";
        volumeOnTip = false;
    }
    else {
        document.getElementById('vol-tip').src = "img/volume.png";
        volumeOnTip = true;
    }
}

function increasefontsize(){
    var elements = document.querySelectorAll('*');
    elements.forEach(function(element) {
        var currentSize = parseFloat(window.getComputedStyle(element).fontSize);
        var newSize = currentSize + 2;
        element.style.fontSize = newSize + 'px';
    });
}

function decreasefontsize() {
    var elements = document.querySelectorAll('*');
    
    elements.forEach(function(element) {
        var currentSize = parseFloat(window.getComputedStyle(element).fontSize);
        var newSize = currentSize - 2;
        element.style.fontSize = newSize + 'px';
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var texts = [
        "Tell me a about yourself",
        "What role do you typically take on a team? ",
        "What is a piece of feedback you have received from a former supervisor or colleague?",
        "Describe a time you had to work with a group to achieve a common goal",
        "Describe a time you worked in a team and members of your team differed on the details and direction of a project. What did you do?",
        "Describe a manager or professor you have worked for with a different managerial style than you were used to. How did you adapt to it?",
        "Describe a time you had to take on a challenging new task critical to your long-term success",
        "Tell me about a time you resolved a disagreement in a team.",
        "Tell me about a time you persuaded someone when they were against your idea",
        "Tell me about a time you used fewer resources than what you needed to accomplish a task or goal",
        "Tell me about a time you made a mistake",
        "Tell me about a time you dealt with a failure and the lesson you learned from it",
        "Tell me about a time you missed a deadline",
        "Tell me about a time you started a new role completely different from your background and how did you approach this situation?",
        "Tell me about a time you took a risk",
    ];

    var tips = [
        "Highlight your relevant skills and experiences concisely, focusing on what makes you a strong fit for the role",
        "Highlight your adaptability by showcasing instances where you seamlessly transitioned between roles based on team needs. Emphasize your ability to lead when necessary and support others when appropriate.",
        "Share a specific piece of feedback you received, highlighting its impact on your professional development and how you integrated it into your work approach.",
        "Narrate a specific example where your collaboration and contribution led to the achievement of a significant team objective. Highlight your communication, teamwork, and problem-solving skills.",
        "Illustrate your ability to navigate conflicts constructively by discussing how you facilitated open communication, actively listened to differing viewpoints, and worked towards consensus or compromise to keep the project on track",
        "Demonstrate your flexibility and ability to adapt by explaining how you observed, learned, and adjusted your approach to align with the manager's expectations while still maintaining your core values and work standards.",
        "Highlight your adaptability and willingness to embrace challenges by narrating a specific scenario where you successfully took on a daunting task or adapted to a major change, showcasing your problem-solving abilities and resilience.",
        "Showcase your conflict resolution skills by describing a situation where you effectively mediated a disagreement within the team, fostering understanding, finding common ground, and ultimately reaching a mutually beneficial resolution.",
        "Highlight your persuasive abilities by recounting a scenario where you successfully influenced someone's opinion or decision through effective communication, compelling reasoning, and building rapport.",
        "Illustrate your resourcefulness and efficiency by describing a situation where you achieved successful outcomes with limited resources, emphasizing your ability to prioritize, innovate, and optimize processes.",
        "Demonstrate accountability and growth mindset by openly discussing a mistake you made, detailing how you acknowledged it, took responsibility, learned from it, and implemented measures to prevent similar errors in the future.",
        "Showcase your resilience and ability to learn from setbacks by sharing a specific instance where you faced rejection or failure, reflecting on the experience, and highlighting the valuable lessons you gained from it.",
        "Discuss a situation where you missed a deadline, emphasizing your accountability, communication skills, and ability to mitigate the impact by promptly addressing the issue, communicating transparently with stakeholders, and implementing measures to prevent recurrence.",
        "Illustrate your ability to learn and adapt by sharing how you tackled the challenges of transitioning into a new role divergent from your background, outlining the obstacles you faced, the strategies you employed to overcome them, and the valuable insights you gained from the experience.",
        "Discuss a calculated risk you took, highlighting your ability to weigh the potential outcomes, demonstrate courage, and take decisive action to pursue opportunities or achieve goals.",
    ];


    var currentIndex = 0;

    function updateText() {
        var h3Element = document.querySelector("#question-box h3");
        var h5Element = document.querySelector("#tips-box h5");
        if (h3Element && h5Element) {
            h3Element.textContent = texts[currentIndex];
            h5Element.textContent = tips[currentIndex];
        }
    }

    document.getElementById('next-question').addEventListener("click", function() {
        currentIndex = (currentIndex + 1) % texts.length;
        updateText();
    });

    document.getElementById('next-question').addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            currentIndex = (currentIndex + 1) % texts.length;
            updateText();
        }
    });
    

    updateText();

    document.getElementById('vol-intro-button').addEventListener("click", function() {
        let speechUtterance = new SpeechSynthesisUtterance(texts[currentIndex]);
        speechSynthesis.speak(speechUtterance);
        speechUtterance.onend = function(event) {
            if (volumeOnIntro) {
                changeImageIntro();
            }
        }
    });

    document.getElementById('vol-tip-button').addEventListener("click", function() {
        let speechUtterance = new SpeechSynthesisUtterance(tips[currentIndex]);
        speechSynthesis.speak(speechUtterance);
        speechUtterance.onend = function(event) {
            if (volumeOnTip) {
                changeImageTip();
            }
        }
    });

    document.getElementById('minus-button').addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            decreasefontsize();
        }
    });
    
    document.getElementById('plus-button').addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            increasefontsize();
        }
    });

    var focusableElements = Array.from(document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));

    focusableElements.push(document.getElementById('vol-intro-button'));
    focusableElements.push(document.getElementById('vol-tip-button'));

    document.getElementById('next-question').focus();

    document.addEventListener("keydown", function (event) {
        if (event.key === "Tab") {
            event.preventDefault();
            var focusedElement = document.activeElement;

            var focusedIndex = focusableElements.indexOf(focusedElement);
            var nextIndex = (focusedIndex + 1) % focusableElements.length;
            focusableElements[nextIndex].focus();
        }
    });

    updateText();    
    
}, { once: true });