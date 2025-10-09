document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // PROJECT DATA
    // This is the only section you need to edit to update your portfolio.
    // - To feature a project, add `featured: true`.
    // - `thumbnail` is for the card on the grids.
    // - `images` is a list of pictures for the pop-up gallery.
    // =========================================================================
    const projects = [
        {
            title: 'AnTiMa Discord Bot',
            featured: true, // This project will appear in the "Featured" section
            description: 'AI Powered discord bot capable of answering all your questions and managing basic task in server.',
            thumbnail: 'img/antimashc.png',
            images: [
                'img/antimashc.png',
                'https://via.placeholder.com/800x600/2575FC/FFFFFF?text=Bot+Commands',
                'https://via.placeholder.com/800x600/1a1a1a/FFFFFF?text=Admin+Panel'
            ],
            tags: ['Python', 'Gemini', 'AI', 'MongoDB', 'Discord'],
            link: 'https://github.com/Azurakun/AnTiMa'
        },
        {
            title: 'Data Visualization Dashboard',
            featured: true, // This project will also be featured
            description: 'An interactive dashboard for visualizing sales data, created with D3.js. Allows users to filter data by date, region, and product category for insightful analysis.',
            thumbnail: 'https://via.placeholder.com/600x400/6A11CB/FFFFFF?text=Dashboard',
            images: [
                'https://via.placeholder.com/800x600/6A11CB/FFFFFF?text=Full+Dashboard+View',
                'https://via.placeholder.com/800x600/333333/FFFFFF?text=Data+Filters'
            ],
            tags: ['HTML', 'CSS', 'JavaScript', 'D3.js'],
            link: 'https://example.com'
        },
        {
            title: 'Mobile Weather App UI',
            featured: false, // This project will only appear in the "All Projects" grid
            description: 'A sleek and modern UI concept for a weather application, designed in Figma. This project focuses on user experience and a clean, intuitive interface.',
            thumbnail: 'https://via.placeholder.com/600x400/000000/FFFFFF?text=Weather+UI',
            images: [
                'https://via.placeholder.com/600x800/000000/FFFFFF?text=Main+Screen',
                'https://via.placeholder.com/600x800/1e1e1e/FFFFFF?text=Forecast+View'
            ],
            tags: ['UI/UX', 'Figma', 'Prototyping'],
            link: null // No live link, so the button will be hidden
        }
        // Add more projects here...
    ];

    // =========================================================================
    // SCRIPT LOGIC (No need to edit below this line)
    // =========================================================================

    // --- Element Selection ---
    const featuredGrid = document.getElementById('featured-grid');
    const projectGrid = document.getElementById('project-grid');
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.close-button');
    const galleryImagesContainer = document.getElementById('modal-gallery-images');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // --- State Management ---
    let currentProjectImages = [];
    let currentImageIndex = 0;

    // --- Functions ---

    /**
     * Populates both the featured and regular project grids based on project data.
     */
    function buildProjectGrids() {
        projects.forEach((project, index) => {
            // Create a card for the main "All Projects" grid
            const card = document.createElement('div');
            card.className = 'project-card';
            card.dataset.index = index;
            card.innerHTML = `
                <img src="${project.thumbnail}" alt="${project.title} thumbnail">
                <div class="overlay">${project.title}</div>
            `;
            projectGrid.appendChild(card);

            // If a project is marked as "featured", create a special card for it
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
     * Opens the modal and fills it with the correct project's details.
     * @param {Event} event - The click event from either grid.
     */
    function openModal(event) {
        const card = event.target.closest('.project-card, .featured-card');
        if (!card) return;

        const projectIndex = card.dataset.index;
        const project = projects[projectIndex];

        // Populate text content
        document.getElementById('modal-title').textContent = project.title;
        document.getElementById('modal-description').textContent = project.description;
        
        // Populate tags
        const tagsContainer = document.getElementById('modal-tags');
        tagsContainer.innerHTML = '';
        project.tags.forEach(tagText => {
            const tagElement = document.createElement('span');
            tagElement.className = 'tag';
            tagElement.textContent = tagText;
            tagsContainer.appendChild(tagElement);
        });

        // Handle the live project link button
        const linkButton = document.getElementById('modal-link');
        if (project.link) {
            linkButton.href = project.link;
            linkButton.style.display = 'inline-block';
        } else {
            linkButton.style.display = 'none';
        }

        // Build and display the image gallery
        currentProjectImages = project.images;
        galleryImagesContainer.innerHTML = '';
        currentProjectImages.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${project.title} image`;
            galleryImagesContainer.appendChild(img);
        });
        
        // Show the first image and then display the modal
        currentImageIndex = 0;
        showImage(currentImageIndex);
        modal.style.display = 'block';
    }

    /**
     * Hides the modal from view.
     */
    function closeModal() {
        modal.style.display = 'none';
    }

    /**
     * Displays the image at a specific index in the gallery.
     * @param {number} index - The index of the image to make active.
     */
    function showImage(index) {
        const images = galleryImagesContainer.querySelectorAll('img');
        images.forEach(img => img.classList.remove('active'));
        if (images[index]) {
            images[index].classList.add('active');
        }
    }

    // --- Event Listeners ---

    // Initial setup
    buildProjectGrids();
    
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
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});