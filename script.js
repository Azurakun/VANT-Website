document.addEventListener('DOMContentLoaded', () => {

    // --- YOUR PROJECT DATA ---
    // To add a new project, just copy an object and fill in your details.
    // - For digital art/non-deployed projects, set 'link' to null or remove it.
    // - Use a site like "https://placeholder.com/" for thumbnail images if you need them.
    const projects = [
        {
            title: 'AnTiMa Discord Bot',
            description: 'AI Powered discord bot capable of answering all your questions and managing basic task in server.',
            image: 'https://sm.ign.com/t/ign_nordic/news/a/astro-bot-/astro-bot-finally-gets-2-long-awaited-fan-requested-bots_wsqm.640.jpg',
            tags: ['Python', 'Gemini', 'AI', 'MongoDB', 'Discord'],
            link: 'https://github.com/Azurakun/AnTiMa' // Link to your deployed project
        },
        {
            title: 'Data Visualization Dashboard',
            description: 'An interactive dashboard for visualizing sales data, created with D3.js. Allows users to filter data by date, region, and product category for insightful analysis.',
            image: 'https://via.placeholder.com/600x400.png/6A11CB/FFFFFF?text=Dashboard',
            tags: ['HTML', 'CSS', 'JavaScript', 'D3.js'],
            link: 'https://example.com' // Link to your deployed project
        },
        {
            title: 'Mobile Weather App UI',
            description: 'A sleek and modern UI concept for a weather application, designed in Figma. This project focuses on user experience and a clean, intuitive interface.',
            image: 'https://via.placeholder.com/600x400.png/000000/FFFFFF?text=Weather+UI',
            tags: ['UI/UX', 'Figma', 'Prototyping'],
            link: null // No live link for this project
        },
        {
            title: '3D Sci-Fi Environment',
            description: 'A detailed sci-fi scene created and rendered in Blender. This project showcases skills in 3D modeling, texturing, and lighting to create an immersive atmosphere.',
            image: 'https://via.placeholder.com/600x400.png/333333/FFFFFF?text=3D+Art',
            tags: ['Blender', '3D Modeling', 'Rendering'],
            link: null // No live link for this project
        }
        // Add more projects here...
    ];

    // --- SCRIPT LOGIC ---
    const projectGrid = document.getElementById('project-grid');
    const modal = document.getElementById('project-modal');
    const closeModal = document.querySelector('.close-button');
    
    // Populate project grid
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.classList.add('project-card');
        card.dataset.index = index; // Store index to retrieve data later
        
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="overlay">${project.title}</div>
        `;
        
        projectGrid.appendChild(card);
    });

    // Open modal on card click
    projectGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.project-card');
        if (card) {
            const projectIndex = card.dataset.index;
            const project = projects[projectIndex];
            
            // Populate modal with project data
            document.getElementById('modal-img').src = project.image;
            document.getElementById('modal-title').textContent = project.title;
            document.getElementById('modal-description').textContent = project.description;
            
            const tagsContainer = document.getElementById('modal-tags');
            tagsContainer.innerHTML = ''; // Clear previous tags
            project.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.classList.add('tag');
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });
            
            const linkButton = document.getElementById('modal-link');
            if (project.link) {
                linkButton.href = project.link;
                linkButton.style.display = 'inline-block';
            } else {
                linkButton.style.display = 'none';
            }
            
            modal.style.display = 'block';
        }
    });

    // Close modal logic
    const closeTheModal = () => {
        modal.style.display = 'none';
    };

    closeModal.addEventListener('click', closeTheModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeTheModal();
        }
    });

});