// --- Initial Sample Data ---
const dummyImage = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
const initialNews = [
    { id: 1, title: "Major Political Shift in Madhya Pradesh Assembly", summary: "New developments arise in the capital as key leaders announce their next moves ahead of the session.", category: "Madhya Pradesh", author: "ANN Bhopal Desk", date: "2026-10-02", image: dummyImage, content: "<p>Detailed article content goes here. The assembly saw unprecedented scenes today...</p>", isBreaking: true, isFeatured: true, status: "Published" },
    { id: 2, title: "Sensex Hits Record High Amid Global Rally", summary: "Indian markets surged today driven by tech and banking stocks.", category: "Business", author: "Finance Desk", date: "2026-10-01", image: dummyImage, content: "<p>Investors gained massive returns as the index crossed historical marks...</p>", isBreaking: false, isFeatured: true, status: "Published" },
    { id: 3, title: "National Sports Meet 2026 Concludes in Delhi", summary: "Athletes from across the country showcased stellar performances.", category: "Sports", author: "Sports Correspondent", date: "2026-10-01", image: dummyImage, content: "<p>The closing ceremony was a grand affair...</p>", isBreaking: false, isFeatured: false, status: "Published" },
    { id: 4, title: "New Education Policy Guidelines Released", summary: "Schools to adopt revised curriculum focusing on digital skills.", category: "Education", author: "Edu Desk", date: "2026-09-30", image: dummyImage, content: "<p>The Ministry of Education published the latest framework...</p>", isBreaking: false, isFeatured: false, status: "Published" },
    { id: 5, title: "Tech Giant Announces R&D Center in India", summary: "Thousands of jobs expected to be created in the IT sector.", category: "Business", author: "Tech Reporter", date: "2026-09-30", image: dummyImage, content: "<p>The CEO confirmed the investment during a press brief...</p>", isBreaking: false, isFeatured: true, status: "Published" },
    { id: 6, title: "Monsoon Retreats, Post-Monsoon Showers Expected", summary: "Meteorological department issues weather forecast for October.", category: "India", author: "Weather Desk", date: "2026-09-29", image: dummyImage, content: "<p>Farmers are advised to plan harvests accordingly...</p>", isBreaking: false, isFeatured: false, status: "Published" },
    { id: 7, title: "Bhopal Metro Phase 2 Detailed Project Report Approved", summary: "Commuters to get massive relief as new routes are finalized.", category: "Madhya Pradesh", author: "City Reporter", date: "2026-09-29", image: dummyImage, content: "<p>The state cabinet gave the green signal...</p>", isBreaking: true, isFeatured: false, status: "Published" },
    { id: 8, title: "Blockbuster Movie Breaks Opening Day Records", summary: "The highly anticipated action thriller took the box office by storm.", category: "Entertainment", author: "Cinema Desk", date: "2026-09-28", image: dummyImage, content: "<p>Fans queued outside theaters from midnight...</p>", isBreaking: false, isFeatured: false, status: "Published" },
    { id: 9, title: "Cyber Crime Unit Busts Major Online Fraud Ring", summary: "Five individuals arrested in connection with international phishing scams.", category: "Crime", author: "Crime Reporter", date: "2026-09-28", image: dummyImage, content: "<p>Police seized multiple servers and laptops...</p>", isBreaking: true, isFeatured: false, status: "Published" },
    { id: 10, title: "Cricket Team Announces Squad for Upcoming World Tour", summary: "Surprise inclusions and exclusions mark the selection committee's choice.", category: "Sports", author: "Sports Desk", date: "2026-09-27", image: dummyImage, content: "<p>The captain expressed confidence in the young players...</p>", isBreaking: false, isFeatured: true, status: "Published" },
    { id: 11, title: "Startup Ecosystem Thrives in Tier 2 Cities", summary: "Investors look beyond metros as new hubs emerge.", category: "Business", author: "Business Reporter", date: "2026-09-27", image: dummyImage, content: "<p>Local incubators are playing a key role...</p>", isBreaking: false, isFeatured: false, status: "Published" },
    { id: 12, title: "Elections Commission Outlines Date for By-polls", summary: "Preparations begin across 5 states for the upcoming elections.", category: "Politics", author: "Political Editor", date: "2026-09-26", image: dummyImage, content: "<p>The CEC addressed the media today...</p>", isBreaking: true, isFeatured: false, status: "Published" },
    { id: 13, title: "National Science Exhibition Winners Announced", summary: "Students display innovative solutions for climate change.", category: "Education", author: "Edu Desk", date: "2026-09-26", image: dummyImage, content: "<p>The president handed out the awards...</p>", isBreaking: false, isFeatured: false, status: "Published" },
    { id: 14, title: "Local Festival Celebrated with Grand Fervor in MP", summary: "Streets lit up as citizens gathered for traditional rituals.", category: "Madhya Pradesh", author: "Culture Desk", date: "2026-09-25", image: dummyImage, content: "<p>Cultural programs continued late into the night...</p>", isBreaking: false, isFeatured: false, status: "Published" },
    { id: 15, title: "New Health Guidelines Issued for Winter Season", summary: "Health ministry advises caution amid changing weather.", category: "India", author: "Health Reporter", date: "2026-09-25", image: dummyImage, content: "<p>Hospitals are instructed to keep flu vaccines stocked...</p>", isBreaking: false, isFeatured: false, status: "Published" }
];

// --- App Initialization ---
let newsData = [];

document.addEventListener('DOMContentLoaded', () => {
    initLocalStorage();
    setupTheme();
    setupMobileMenu();
    setupBackToTop();

    const pageId = document.body.id;
    if (pageId === 'page-home') initHome();
    if (pageId === 'page-news') initNewsPage();
    if (pageId === 'page-article') initArticlePage();
    if (pageId === 'page-admin') initAdmin();
    if (pageId === 'page-contact') initContact();
    if (pageId === 'page-videos') initVideos();
    if (pageId === 'page-gallery') initGallery();

    populateTicker();
});

// --- Core Functions ---
function initLocalStorage() {
    const storedNews = localStorage.getItem('ann_news');
    if (!storedNews) {
        localStorage.setItem('ann_news', JSON.stringify(initialNews));
        newsData = initialNews;
    } else {
        newsData = JSON.parse(storedNews);
    }
}

function getPublishedNews() {
    return newsData.filter(n => n.status === 'Published').sort((a, b) => new Date(b.date) - new Date(a.date));
}

function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-IN', options);
}

function generateNewsCard(news) {
    return `
        <article class="card">
            <div class="card-img-wrap">
                <span class="category-badge">${news.category}</span>
                <img src="${news.image}" alt="${news.title}" loading="lazy">
            </div>
            <div class="card-content">
                <h3 class="card-title"><a href="article.html?id=${news.id}">${news.title}</a></h3>
                <div class="card-meta">${formatDate(news.date)} | ${news.author}</div>
                <p class="card-desc">${news.summary}</p>
                <a href="article.html?id=${news.id}" class="btn btn-outline" style="margin-top:auto; align-self:start;">Read More</a>
            </div>
        </article>
    `;
}

function showToast(message) {
    const toast = document.getElementById("toast");
    if(!toast) return;
    toast.textContent = message;
    toast.className = "toast show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

// --- UI Interactions ---
function setupTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let switchToTheme = theme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', switchToTheme);
            localStorage.setItem('theme', switchToTheme);
        });
    }
}

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('nav-menu');
    if(btn && nav) {
        btn.addEventListener('click', () => nav.classList.toggle('active'));
    }
}

function setupBackToTop() {
    const btt = document.getElementById('back-to-top');
    if(!btt) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) btt.style.display = "block";
        else btt.style.display = "none";
    });
    btt.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
}

function populateTicker() {
    const ticker = document.getElementById('breaking-ticker');
    if(!ticker) return;
    const breaking = getPublishedNews().filter(n => n.isBreaking);
    if(breaking.length === 0) {
        document.querySelector('.breaking-news-bar').style.display = 'none';
        return;
    }
    ticker.innerHTML = breaking.map(n => `<a href="article.html?id=${n.id}">✦ ${n.title}</a>`).join('');
}

// --- Page Specific Logic ---
function initHome() {
    const published = getPublishedNews();
    
    // Hero Section
    const heroGrid = document.getElementById('hero-grid');
    const featured = published.filter(n => n.isFeatured);
    if(heroGrid && featured.length >= 3) {
        const mainFeature = featured[0];
        const subFeatures = [featured[1], featured[2]];
        
        let html = `<div class="hero-main card">
            <div class="card-img-wrap"><span class="category-badge">${mainFeature.category}</span><img src="${mainFeature.image}" alt=""></div>
            <div class="card-content">
                <h3 class="card-title"><a href="article.html?id=${mainFeature.id}">${mainFeature.title}</a></h3>
                <div class="card-meta">${formatDate(mainFeature.date)}</div>
                <p class="card-desc">${mainFeature.summary}</p>
            </div>
        </div><div class="hero-sub">`;
        
        subFeatures.forEach(n => {
            html += `<div class="card">
                <div class="card-img-wrap"><img src="${n.image}" alt=""></div>
                <div class="card-content">
                    <span style="color:var(--primary-red); font-size:0.7rem; font-weight:bold; text-transform:uppercase;">${n.category}</span>
                    <h4 class="card-title" style="font-size:1rem; margin-top:5px;"><a href="article.html?id=${n.id}">${n.title}</a></h4>
                    <div class="card-meta" style="margin-bottom:0;">${formatDate(n.date)}</div>
                </div>
            </div>`;
        });
        html += `</div>`;
        heroGrid.innerHTML = html;
    }

    // Latest News Grid
    const latestGrid = document.getElementById('latest-news-grid');
    if(latestGrid) {
        const latest = published.slice(0, 6);
        latestGrid.innerHTML = latest.map(generateNewsCard).join('');
    }

    // Trending List
    const trendingList = document.getElementById('trending-list');
    if(trendingList) {
        const trending = published.slice(3, 8); // Just grabbing a slice for demo
        trendingList.innerHTML = trending.map(n => `<li><a href="article.html?id=${n.id}">${n.title}</a></li>`).join('');
    }
}

function initNewsPage() {
    const grid = document.getElementById('all-news-grid');
    const filters = document.getElementById('category-filters');
    const published = getPublishedNews();
    
    // Check URL for category
    const urlParams = new URLSearchParams(window.location.search);
    const urlCat = urlParams.get('category');
    
    function renderNews(category) {
        let filtered = category === 'All' ? published : published.filter(n => n.category === category);
        grid.innerHTML = filtered.length ? filtered.map(generateNewsCard).join('') : '<p>No news found in this category.</p>';
    }

    if(filters) {
        const btns = filters.querySelectorAll('.filter-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                btns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                renderNews(e.target.dataset.filter);
            });
            if(urlCat && btn.dataset.filter === urlCat) {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    }
    renderNews(urlCat || 'All');
}

function initArticlePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const articleSection = document.getElementById('article-content');
    const relatedList = document.getElementById('related-news-list');
    
    const article = newsData.find(n => n.id === id) || newsData[0]; // fallback to first if not found
    
    if(articleSection && article) {
        document.title = `${article.title} | ANN`;
        articleSection.innerHTML = `
            <div class="article-header">
                <span style="color:var(--primary-red); font-weight:bold; text-transform:uppercase;">${article.category}</span>
                <h1>${article.title}</h1>
                <div class="article-meta">
                    <span>By ${article.author}</span>
                    <span>${formatDate(article.date)}</span>
                </div>
            </div>
            <img src="${article.image}" class="article-featured-img" alt="${article.title}">
            <div class="article-body">
                <p><strong>${article.summary}</strong></p>
                ${article.content}
            </div>
        `;
        
        // Related
        const related = getPublishedNews().filter(n => n.category === article.category && n.id !== article.id).slice(0,4);
        if(relatedList) {
            relatedList.innerHTML = related.map(n => `
                <div style="margin-bottom:15px; border-bottom:1px solid var(--border-color); padding-bottom:10px;">
                    <a href="article.html?id=${n.id}" style="font-weight:600;">${n.title}</a>
                    <div style="font-size:0.8rem; color:var(--text-light);">${formatDate(n.date)}</div>
                </div>
            `).join('');
        }
    }
}

function initVideos() {
    const grid = document.getElementById('video-grid');
    const modal = document.getElementById('video-modal');
    const container = document.getElementById('video-container');
    const closeBtn = document.querySelector('.video-modal-content .close-modal');
    
    const dummyVideos = [
        {title: "Exclusive Interview with Chief Minister", date: "2026-10-02", img: dummyImage, ytId: "dQw4w9WgXcQ"},
        {title: "Ground Report: Monsoon Impact in Bhopal", date: "2026-10-01", img: dummyImage, ytId: "dQw4w9WgXcQ"},
        {title: "Sports Highlights of the Week", date: "2026-09-30", img: dummyImage, ytId: "dQw4w9WgXcQ"}
    ];

    if(grid) {
        grid.innerHTML = dummyVideos.map(v => `
            <div class="card video-card" data-yt="${v.ytId}" style="cursor:pointer;">
                <div class="card-img-wrap">
                    <img src="${v.img}" alt="${v.title}">
                    <div class="play-btn">▶</div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${v.title}</h3>
                    <div class="card-meta">${formatDate(v.date)}</div>
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('.video-card').forEach(card => {
            card.addEventListener('click', () => {
                const ytId = card.dataset.yt;
                container.innerHTML = `<iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
                modal.style.display = 'block';
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            container.innerHTML = ''; // Stop video
        });
        window.addEventListener('click', (e) => {
            if(e.target === modal) { modal.style.display = 'none'; container.innerHTML = ''; }
        });
    }
}

function initGallery() {
    const grid = document.getElementById('gallery-grid');
    const modal = document.getElementById('lightbox-modal');
    const lbImg = document.getElementById('lightbox-img');
    const lbCounter = document.getElementById('img-counter');
    const closeBtn = document.querySelector('.lightbox-content .close-modal');
    const prevBtn = document.getElementById('prev-img');
    const nextBtn = document.getElementById('next-img');

    const galleries = [
        { title: "Diwali Celebrations in MP", imgs: [dummyImage, dummyImage, dummyImage] },
        { title: "National Games Opening", imgs: [dummyImage, dummyImage] }
    ];

    let currentGallery = [];
    let currentIndex = 0;

    if(grid) {
        grid.innerHTML = galleries.map((g, index) => `
            <div class="card" data-idx="${index}" style="cursor:pointer;">
                <div class="card-img-wrap"><img src="${g.imgs[0]}" alt="${g.title}"></div>
                <div class="card-content">
                    <h3 class="card-title">${g.title}</h3>
                    <div class="card-meta">${g.imgs.length} Photos</div>
                </div>
            </div>
        `).join('');

        grid.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.dataset.idx);
                currentGallery = galleries[idx].imgs;
                currentIndex = 0;
                updateLightbox();
                modal.style.display = 'block';
            });
        });

        const updateLightbox = () => {
            lbImg.src = currentGallery[currentIndex];
            lbCounter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
        };

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentGallery.length - 1;
            updateLightbox();
        });
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex < currentGallery.length - 1) ? currentIndex + 1 : 0;
            updateLightbox();
        });

        closeBtn.addEventListener('click', () => modal.style.display = 'none');
        window.addEventListener('click', (e) => { if(e.target === modal) modal.style.display = 'none'; });
    }
}

function initContact() {
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast("Thank you! Your message has been sent successfully.");
            form.reset();
        });
    }
}

// --- Admin Logic ---
function initAdmin() {
    // Sidebar Tabs
    const tabs = document.querySelectorAll('.admin-nav a[data-tab]');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
            if(window.innerWidth <= 768) document.getElementById('admin-sidebar').classList.remove('active');
        });
    });

    const menuBtn = document.getElementById('admin-menu-btn');
    if(menuBtn) menuBtn.addEventListener('click', () => document.getElementById('admin-sidebar').classList.toggle('active'));

    updateAdminStats();
    renderAdminTable();

    // Form Submit
    const form = document.getElementById('news-form');
    if(form) {
        document.getElementById('btn-publish').addEventListener('click', () => submitNews('Published'));
        document.getElementById('btn-draft').addEventListener('click', () => submitNews('Draft'));
        
        function submitNews(status) {
            if(!form.checkValidity()) return;
            event.preventDefault();
            
            const idInput = document.getElementById('news-id').value;
            const newEntry = {
                id: idInput ? parseInt(idInput) : Date.now(),
                title: document.getElementById('news-title').value,
                summary: document.getElementById('news-summary').value,
                category: document.getElementById('news-category').value,
                author: document.getElementById('news-author').value,
                image: document.getElementById('news-image').value || dummyImage,
                content: `<p>${document.getElementById('news-content').value.replace(/\n/g, '<br>')}</p>`,
                isBreaking: document.getElementById('news-breaking').checked,
                isFeatured: document.getElementById('news-featured').checked,
                status: status,
                date: new Date().toISOString().split('T')[0]
            };

            if(idInput) {
                const idx = newsData.findIndex(n => n.id === parseInt(idInput));
                if(idx !== -1) newsData[idx] = newEntry;
            } else {
                newsData.unshift(newEntry);
            }

            localStorage.setItem('ann_news', JSON.stringify(newsData));
            showToast(`News ${status} successfully!`);
            form.reset();
            document.getElementById('news-id').value = '';
            document.getElementById('form-title').innerText = 'Add New Article';
            
            updateAdminStats();
            renderAdminTable();
            document.querySelector('.admin-nav a[data-tab="manage-news"]').click();
        }
    }
}

function updateAdminStats() {
    document.getElementById('stat-total').innerText = newsData.length;
    document.getElementById('stat-published').innerText = newsData.filter(n => n.status === 'Published').length;
    document.getElementById('stat-drafts').innerText = newsData.filter(n => n.status === 'Draft').length;
}

function renderAdminTable() {
    const tbody = document.getElementById('admin-news-list');
    if(!tbody) return;
    
    tbody.innerHTML = newsData.map(n => `
        <tr>
            <td><strong>${n.title.substring(0, 40)}...</strong></td>
            <td>${n.category}</td>
            <td>${n.date}</td>
            <td><span style="color:${n.status==='Published'?'green':'orange'}">${n.status}</span></td>
            <td>
                <button class="action-btn btn-edit" onclick="editNews(${n.id})">Edit</button>
                <button class="action-btn btn-delete" onclick="deleteNews(${n.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

window.editNews = function(id) {
    const article = newsData.find(n => n.id === id);
    if(!article) return;
    
    document.querySelector('.admin-nav a[data-tab="add-news"]').click();
    document.getElementById('form-title').innerText = 'Edit Article';
    document.getElementById('news-id').value = article.id;
    document.getElementById('news-title').value = article.title;
    document.getElementById('news-summary').value = article.summary;
    document.getElementById('news-category').value = article.category;
    document.getElementById('news-author').value = article.author;
    document.getElementById('news-image').value = article.image;
    document.getElementById('news-content').value = article.content.replace(/<p>|<\/p>|<br>/g, '\n').trim();
    document.getElementById('news-breaking').checked = article.isBreaking;
    document.getElementById('news-featured').checked = article.isFeatured;
};

window.deleteNews = function(id) {
    if(confirm('Are you sure you want to delete this news?')) {
        newsData = newsData.filter(n => n.id !== id);
        localStorage.setItem('ann_news', JSON.stringify(newsData));
        updateAdminStats();
        renderAdminTable();
        showToast('News deleted.');
    }
};