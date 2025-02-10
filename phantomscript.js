const articles = [
    {
        id: 1,
        writers: 'Sean Wallace (09) & Tony Xu (09)',
        editor: 'Guanlin Wang (12)',
        title: 'Mastering the Capstone: Teacher Tips and Insights for Success',
        description: 'Several teachers shared their valuable insights and advice to help students succeed with their Capstone projects. Through interviews, Ms. Vanderklippe, Mr. Raoul, Ms. Liao, and Mr. Nugent provided advice on choosing a meaningful topic, managing time, and overcoming challenges like procrastination.',
        content: `
            <p> Sample Article 1</p>
        `,
        category: 'Features',
        image: 'Articlepics/Dec/Emma.jpg',
        pages: ['home', 'features', 'allarticles'],
    },
    {
        id: 2,
        writers: 'Johanna Kim (11) & Lina Kotoge (11)',
        editor: 'Tara Pai (11)',
        title: 'Festive Fun in Vancouver: Top Christmas Events to Celebrate the Season!',
        description: 'A variety of festive events in Vancouver this holiday season offer something for everyone. These events include a mix of markets, live performances, and light displays, with options for both paid and free activities. From holiday shopping and seasonal treats to family-friendly entertainment and parades, there are plenty of opportunities to celebrate the season with loved ones.',
        content: `
        <p>Sample Article 2</p>
    `,
        category: 'Events',
        photocredit: 'Pinterest',
        image: 'Articlepics/Dec/Jo.jpg',
        pages: ['home', 'local-news', 'allarticles'],
    },
    {
        id: 3,
        writers: 'Hank Cheung (10)',
        editor: 'Guanlin Wang (12)',
        photocredit: 'Caitlyn Wallace (12)',
        title: 'Senior Boys Soccer Team Reflects on a Season of Resilience and Growth',
        description: 'The Senior Boys Soccer Team’s season was a mix of strong performances and missed opportunities, with key victories and narrow defeats shaping their journey. Despite falling short of their championship goals, the team’s resilience and standout players set the stage for future success.',
        content: `
            <p>Sample Article 3</p>
        `,
        category: 'Sports',
        image: 'Articlepics/Dec/Hank.jpg',
        pages: ['home', 'school-news', 'allarticles'],
    },
    {
        id: 4,
        writers: 'Ivy Kettlewell (11)',
        title: 'History of Byng Arts',
        editor: 'Tara Pai (11)',
        description: 'The Lord Byng Arts Mini School, established in 1999, has provided a supportive space for artistic expression, evolving from grassroots programs in music and drama to five distinct focus areas. The program has significantly contributed to Lord Byng’s reputation as Vancouver’s top secondary school. Despite recent debates on mini schools and streaming, including a controversial decision to cancel senior Byng Arts courses in 2024, the community remains strong.',
        content: `
            <p>Sample Article 4</p>
        `,
        category: 'School',
        photocredit: 'https://byng2.vsb.bc.ca/byngarts/',
        image: 'Articlepics/Dec/Ivy.jpg',
        pages: ['home', 'features', 'allarticles'],
    },
    {
        id: 5,
        writers: 'Emma Wang & Leala Chang ',
        title: 'The Stinkin’ Truth',
        editor: 'Charlie Zhang (10)',
        description: 'Lord Byng’s washrooms face ongoing complaints about poor facilities, wasteful behavior, and funding challenges. Issues like empty soap dispensers, broken sinks, and low-quality materials reflect broader resource allocation concerns. While improvements are discussed, financial constraints make significant changes unlikely without district support.',
        content: `
            <p>Sample Article 5</p>
        `,
        category: 'School',
        photocredit: 'Dharaneeswar (11)',
        image: 'Articlepics/Dec/leala.jpg',
        pages: ['home', 'school-news', 'allarticles'],
    },
];

// Function to load articles dynamically
function loadArticles(page, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear the container before loading articles

    const filteredArticles = articles.filter(article => article.pages.includes(page));

    filteredArticles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        // Structure for the article container
        articleDiv.innerHTML = `
            <div class="image-container">
                <img src="${article.image}" alt="${article.title}" class="article-image">
            </div>
            <div class="article-details">
                <h3 class="article-category">${article.category}</h3>
                <h5 class="article-title">${article.title}</h5>
                <p class="article-description">${article.description}</p>
            </div>
        `;

        // Make the entire article container clickable
        articleDiv.addEventListener('click', () => {
            localStorage.setItem('selectedArticle', JSON.stringify(article));
            loadContent('article');
        });

        container.appendChild(articleDiv);
    });
}

// Function to render pages
function renderPage(container, pageContent) {
    container.innerHTML = pageContent;
}

function renderArticlePage(container) {
    const articleData = JSON.parse(localStorage.getItem('selectedArticle'));
    if (articleData) {
        renderPage(container, `
            <section class="article-fullscreen">
                <h1 class="article-title">${articleData.title}</h1>
                <p1 class = "article-writer">${articleData.writers}</p1>
                <br>
                <p1 class = "article-editor"><em>Edited by: ${articleData.editor}</em></p1>
                <img src="${articleData.image}" alt="${articleData.title}" class="article-image" style="max-width: 100%; height: auto;">
                <br>
                <p1 class = "article-credit">Photo credit: ${articleData.photocredit}</p1>
                <p class="article-body">${articleData.content}</p>
            </section>
            <section class = "backbutton">
            <button id="back-button">Back</button>
            </section>
            <br>
        `);

        document.getElementById('back-button').addEventListener('click', () => {
            loadContent('home');
        });
    } else {
        renderPage(container, '<p>No article data available.</p>');
    }
}

// Function to handle the 'More Articles' button click
function setupMoreArticlesButton() {
    const moreArticlesButton = document.getElementById('more-articles'); // Targeting the More Articles button by its ID

    if (moreArticlesButton) {
        moreArticlesButton.addEventListener('click', () => {
            loadContent('allarticles'); // This will navigate to the All Articles page
        });
    }
}

// Hamburger Menu Functionality
function setupHamburgerMenu() {
    const hamburgerButton = document.getElementById('hamburger-button');
    const closeButton = document.getElementById('close-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerButton && mobileMenu && closeButton) {
        // Toggle menu visibility when hamburger button is clicked
        hamburgerButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('visible');
            mobileMenu.classList.toggle('hidden');
        });

        // Close the mobile menu when close button is clicked
        closeButton.addEventListener('click', () => {
            mobileMenu.classList.remove('visible');
            mobileMenu.classList.add('hidden');
        });

        // Close the mobile menu and load content when a navigation link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Prevent default link behavior
                const page = link.getAttribute('href').substring(1); // Extract the page name
                mobileMenu.classList.remove('visible'); // Hide menu
                mobileMenu.classList.add('hidden');
                loadContent(page); // Load the selected page
            });
        });
    }
}

// Call this function after the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    setupHamburgerMenu();
});