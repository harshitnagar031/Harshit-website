// Fetch GitHub Projects
async function fetchProjects() {
    try {
        const response = await fetch('/api/github/projects');
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('projects-grid').innerHTML = 
            '<p class="error">Failed to load projects. Please try again later.</p>';
    }
}

// Display Projects
function displayProjects(projects) {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = projects.map(project => `
        <div class="card project-card">
            <h3>
                <a href="${project.url}" target="_blank" rel="noopener noreferrer">
                    ${project.name}
                </a>
            </h3>
            <p>${project.description}</p>
            <div class="project-meta">
                <span class="stars">
                    <i class="fas fa-star"></i> ${project.stars}
                </span>
                ${project.language ? 
                    `<span class="tag">${project.language}</span>` : 
                    ''}
            </div>
            <div class="skills-tags">
                ${project.topics.map(topic => 
                    `<span class="tag">${topic}</span>`
                ).join('')}
            </div>
        </div>
    `).join('');
}

// Handle Contact Form
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value
    };

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
});

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});
