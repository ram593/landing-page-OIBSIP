// All variables

const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');
const modeIcon = document.getElementById('mode-icon');
const menuBerger = document.getElementById('menu-berger');
const body = document.body;
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const logo = document.querySelector('.logo');
const work = document.getElementById('work');
//const map = document.getElementById('map')
const workImages = document.getElementById('work-images');
const workCategories = document.getElementById('work-categories').getElementsByTagName('li');


// Getting Class from Local storage
work.classList.add(localStorage.getItem('secTheme'));
map.classList.add(localStorage.getItem('secTheme'));
const savedTheme = localStorage.getItem('theme');

// Dark & Light Mode Convertor
// Check localStorage for saved theme preference
menuBerger.style.color = 'white';

if (savedTheme) {
    body.classList.add(savedTheme);
    updateIcon(savedTheme);
} else {
    // Default to light mode if no preference is saved
    localStorage.setItem('theme', 'light-mode');
}

modeIcon.addEventListener('click', () => {
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        work.classList.add('gray-light')
        work.classList.remove('gray-dark')
        map.classList.add('gray-light')
        map.classList.remove('gray-dark')
        localStorage.setItem('theme', 'light-mode');
        localStorage.setItem('secTheme', 'gray-light');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');

        work.classList.remove('gray-light')
        work.classList.add('gray-dark')
        map.classList.remove('gray-light')
        map.classList.add('gray-dark')
        localStorage.setItem('theme', 'dark-mode');
        localStorage.setItem('secTheme', 'gray-dark');
    }
    updateIcon(localStorage.getItem('theme'));
});

function updateIcon(theme) {
    if (theme === 'dark-mode') {
        modeIcon.classList.remove('icon-sun');
        modeIcon.classList.add('icon-moon');
    } else {
        modeIcon.classList.remove('icon-moon');
        modeIcon.classList.add('icon-sun');
    }
}


// Nav Mobile View 

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('show');
});


// Onscrll change the header background and nav links active

// Function to remove active class from all nav links
function setActiveLink() {
    let scrollPosition = window.pageYOffset + 100; // Adjust offset as needed

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector('.nav-link.active').classList.remove('active');
            document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
        }
    });
}

function setHeaderStyle() {
    if (window.scrollY > 80) {
        header.classList.add('scrolled');
        logo.src = './Assets/logo_intern.png';
        menuBerger.style.color = 'black'
    } else {
        header.classList.remove('scrolled');
        logo.src = './Assets/logo_intern.png';
        menuBerger.style.color = 'white'
    }
}

window.addEventListener('scroll', () => {
    setActiveLink();
    setHeaderStyle();
});



// Object containing categories and their respective images
const imagesData = {
    'All': [
        './Assets/internship-coding.jpg',
        './Assets/internship-data.jpg',
        './Assets/internship-design.jpg',
        './Assets/internship-networking.jpg',
        './Assets/ds.png',
        './Assets/dev.png'
    ],
    'Coding': [
        './Assets/internship-coding.jpg',
        './Assets/dev.png'
    ],
    'Design': [
        './Assets/internship-design.jpg'
    ],
    'Data Science': [
        './Assets/internship-data.jpg',
        './Assets/ds.png'
    ],
    'Networking': [
        './Assets/internship-networking.jpg'
    ]
};

function renderImages(category) {
    workImages.innerHTML = '';

    const selectedImages = imagesData[category];

    selectedImages.forEach(imageSrc => {
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        imgElement.classList.add('fade-in'); // Add fade-in class for animation

        workImages.appendChild(imgElement);

        // Delay adding the show class to allow the transition
        setTimeout(() => {
            imgElement.classList.add('show');
        }, 10); // Short delay to trigger the animation
    });
}

function updateActiveCategory(clickedCategory) {
    Array.from(workCategories).forEach(category => {
        category.classList.remove('work-active');
    });
    clickedCategory.classList.add('work-active');
}

Array.from(workCategories).forEach(category => {
    category.addEventListener('click', function () {
        const selectedCategory = this.textContent;
        updateActiveCategory(this);
        renderImages(selectedCategory);
    });
});

renderImages('All');


// Quote Generator

const apiURL = "https://type.fit/api/quotes";

        async function getQuote() {
            try {
                // Display loading text while fetching
                document.getElementById("quote").innerHTML = "Loading...";
                
                // Fetch quotes from API
                const response = await fetch(apiURL);
                
                // Check if response is OK
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Parse JSON data
                const data = await response.json();
                
                // Select a random quote
                const randomIndex = Math.floor(Math.random() * data.length);
                const { text, author } = data[randomIndex];
                
                // Update the quote text and author
                document.getElementById("quote").innerHTML = `"${text}" — ${author || "Unknown"}`;
            } catch (error) {
                console.error("Error fetching the quote:", error);
                document.getElementById("quote").innerHTML = "Sorry, something went wrong. Please try again.";
            }
        }

        // Load an initial quote
        getQuote(apiURL);

document.addEventListener('DOMContentLoaded', () => {
    // Select all sections to observe
    const sections = document.querySelectorAll('section');

    // Create an intersection observer instance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Stop observing after adding the class
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const lines = document.querySelectorAll('.line');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const line = entry.target;
                line.classList.add('animate-line');
                // Stop observing after adding the class
                observer.unobserve(line);
            }
        });
    }, { 
        root: null, 
        rootMargin: '0px 0px -10% 0px', // Adjust the bottom margin to trigger before it reaches the bottom
        threshold: 0
    });

    lines.forEach(line => {
        observer.observe(line);
    });
});