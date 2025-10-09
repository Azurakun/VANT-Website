document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // PROJECT DATA
    // This is the only section you need to edit to update your portfolio.
    // =========================================================================
    const projects = [
        {
            title: 'AnTiMa Discord Bot',
            featured: true, // Set to true to add this project to the "Featured" section
            description: 'AI Powered discord bot capable of answering all your questions and managing basic task in server.',
            thumbnail: 'img/antimashc.png', // Image for the card on the grids
            images: [ // A list of images for the pop-up gallery
                'img/antimashc.png',
                'https://via.placeholder.com/800x600/2575FC/FFFFFF?text=Bot+Commands',
            ],
            tags: ['Python', 'Gemini', 'AI', 'MongoDB', 'Discord'],
            link: 'https://github.com/Azurakun/AnTiMa' // Link to the live project or repository
        },
        // Add more project objects here...
    ];

    // =========================================================================
    // SCRIPT LOGIC (No need to edit below this line)
    // =========================================================================

    // --- 1. Element Selection ---
    const featuredGrid = document.getElementById('featured-grid');
    const projectGrid = document.getElementById('project-grid');
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.close-button');
    const galleryImagesContainer = document.getElementById('modal-gallery-images');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // --- 2. State Management ---
    let currentProjectImages = [];
    let currentImageIndex = 0;

    // --- 3. Functions ---

    /**
     * Creates and populates both the featured and regular project grids.
     */
    function buildProjectGrids() {
        projects.forEach((project, index) => {
            // Create a standard card for the "All Projects" grid
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.index = index;
            card.innerHTML = `
                <img src="${project.thumbnail}" alt="${project.title} thumbnail">
                <div class="overlay">${project.title}</div>
            `;
            projectGrid.appendChild(card);

            // If a project is featured, create a special card for it
            if (project.featured) {
                const featuredCard = document.createElement('div');
                featuredCard.className = 'featured-card';
                featuredCard.dataset.index = index;
                const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
                featuredCard.innerHTML = `
                    <div class="featured-image">
                        <img src="${project.thumbnail}" alt="${project.title} featured thumbnail">
                    </div>
                    <div class="featured-info">
                        <h3>${project.title}</h3>
                        <p>${project.description.substring(0, 150)}...</p>
                        <div class="tags">${tagsHTML}</div>
                    </div>
                `;
                featuredGrid.appendChild(featuredCard);
            }
        });
    }

    /**
     * Opens the modal and fills it with a project's details.
     * @param {Event} event - The click event from a project card.
     */
    function openModal(event) {
        const card = event.target.closest('.project-card, .featured-card');
        if (!card) return;

        const project = projects[card.dataset.index];

        // Populate modal with text and tags
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-description').textContent = project.description;
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

        // Configure the "View Live Project" button
        const linkButton = document.getElementById('modal-link');
        linkButton.style.display = project.link ? 'inline-block' : 'none';
        if (project.link) linkButton.href = project.link;

        // Build the image gallery
        currentProjectImages = project.images;
        galleryImagesContainer.innerHTML = '';
        currentProjectImages.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            galleryImagesContainer.appendChild(img);
        });
        
        // Show the first image and display the modal
        currentImageIndex = 0;
        showImage(currentImageIndex);
        modal.style.display = 'block';
    }

    /**
     * Hides the modal.
     */
    function closeModal() {
        modal.style.display = 'none';
    }

    /**
     * Displays a specific image in the gallery.
     * @param {number} index - The index of the image to display.
     */
    function showImage(index) {
        galleryImagesContainer.querySelectorAll('img').forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
    }

    /**
     * Initializes scroll-triggered animations for elements.
     */
    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        });
        document.querySelectorAll('.hidden').forEach(el => observer.observe(el));
    }

    // --- 4. Event Listeners ---

    // Build the portfolio grids on page load
    buildProjectGrids();
    
    // Set up scroll animations
    setupScrollAnimations();
    
    // Listen for clicks on both grids to open the modal
    projectGrid.addEventListener('click', openModal);
    featuredGrid.addEventListener('click', openModal);

    // Gallery navigation controls
    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % currentProjectImages.length;
        showImage(currentImageIndex);
    });
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + currentProjectImages.length) % currentProjectImages.length;
        showImage(currentImageIndex);
    });

    // Modal closing controls
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', event => {
        if (event.target === modal) {
            closeModal();
        }
    });
});