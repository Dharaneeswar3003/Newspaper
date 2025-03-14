let articles = [];

// Fetch articles from Google Apps Script API
async function fetchArticles() {
    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbwjuYQcceKYkKnLu_8lDcayZJQ1h3BQCAiNWURO5Is5HXYYRka-hc_8QTZh7sW4Srgz/exec");
        articles = await response.json();

        const currentPage = getCurrentPage();
        if (currentPage === "home") {
            loadArticles("home", "home-articles");
            setupMoreArticlesButton();
        } else if (currentPage === "news") {
            loadArticles("School News", "schoolnews-articles");
            loadArticles("Local News", "localnews-articles");
        } else if (currentPage === "features") {
            loadArticles("Features", "features-articles");
        } else if (currentPage === "allarticles") {
            loadArticles("all", "all-articles");
        } else if (currentPage === "article") {
            loadArticlePage();
        }
    } catch (error) {
        console.error("Error fetching articles:", error);
    }
}

// Function to determine current page
function getCurrentPage() {
    const path = window.location.pathname.split("/").pop().toLowerCase();
    if (!path || path === "index.html") return "home";
    return path.replace(".html", "");
}

// Function to load and filter articles
function loadArticles(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID "${containerId}" not found.`);
        return;
    }
    container.innerHTML = ''; // Clear existing content

    // Sort articles by ID (latest first)
    const sortedArticles = [...articles].sort((a, b) => b.id - a.id);

    let filteredArticles;
    if (category === "home") {
        filteredArticles = sortedArticles.slice(0, 10);
    } else if (category === "all") {
        filteredArticles = sortedArticles;
    } else {
        filteredArticles = sortedArticles.filter(article => {
            const articleCategories = article.category.split(",").map(cat => cat.trim());
            return articleCategories.includes(category);
        });
    }

    if (filteredArticles.length === 0) {
        container.innerHTML = '<p>No articles found for this section.</p>';
        return;
    }

    filteredArticles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('article');

        // Use image URL directly from API (assuming it's already converted)
        const validImageUrl = article.image || 'default-image.jpg';

        articleDiv.innerHTML = `
            <div class="image-container">
                <iframe src="${validImageUrl}" class="article-image" allowfullscreen></iframe>
            </div>
            <div class="article-details">
                <h3 class="article-category">${article.category}</h3>
                <h5 class="article-title">${article.title}</h5>
                <p class="article-description">${article.description}</p>
            </div>
        `;

        articleDiv.addEventListener('click', () => {
            const currentPage = window.location.pathname.split("/").pop().toLowerCase();
            const articlePagePath = currentPage === "index.html" || currentPage === ""
                ? `Pages/article.html?id=${article.id}`
                : `article.html?id=${article.id}`;
            window.location.href = articlePagePath;
        });

        container.appendChild(articleDiv);
    });
}

// Function to load a single article based on URL parameter
function loadArticlePage() {
    const params = new URLSearchParams(window.location.search);
    const articleId = parseInt(params.get('id'));

    if (!articles.length) {
        setTimeout(loadArticlePage, 100); // Retry if data isn't loaded yet
        return;
    }

    const article = articles.find(a => a.id === articleId);

    if (article) {
        document.querySelector('.article-title').textContent = article.title;
        
        const imageElement = document.querySelector('.article-image');
        imageElement.src = article.image;  // Use direct API URL
        imageElement.alt = article.title;

        document.querySelector('.article-body').innerHTML = article.content;
    } else {
        window.location.href = '../index.html';
    }
}

// Fetch articles when the page loads
document.addEventListener('DOMContentLoaded', fetchArticles);

// Hamburger Menu Functionality
function setupHamburgerMenu() {
    const hamburgerButton = document.getElementById('hamburger-button');
    const closeButton = document.getElementById('close-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (hamburgerButton && mobileMenu && closeButton) {
        hamburgerButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('visible');
            mobileMenu.classList.toggle('hidden');
        });

        closeButton.addEventListener('click', () => {
            mobileMenu.classList.remove('visible');
            mobileMenu.classList.add('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const href = link.getAttribute('href');
                mobileMenu.classList.remove('visible');
                mobileMenu.classList.add('hidden');
                window.location.href = href;
            });
        });
    }
}

// 'More Articles' button functionality
function setupMoreArticlesButton() {
    const moreArticlesButton = document.getElementById('more-articles');
    if (!moreArticlesButton) {
        console.error('More Articles button not found.');
        return;
    }

    moreArticlesButton.addEventListener('click', () => {
        window.location.href = "Pages/Allarticles.html";
    });
}

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupHamburgerMenu();
});
