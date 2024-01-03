document.addEventListener('DOMContentLoaded', function () {
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                // Update 'active' class after scrolling
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                anchor.classList.add('active');
            }
        });
    });

    // Active Navigation Item
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove 'active' class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });

            // Add 'active' class to the clicked link
            link.classList.add('active');

            // Scroll to the target section
            const targetSection = document.querySelector(link.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active tab on page load
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 50;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            document.querySelectorAll('nav a').forEach(navLink => {
                navLink.classList.remove('active');
            });

            const activeNavLink = document.querySelector(`nav a[href="#${section.id}"]`);
            if (activeNavLink) {
                activeNavLink.classList.add('active');
            }
        }
    });

    // Responsive Navigation Toggle
    const navToggle = document.createElement('div');
    navToggle.classList.add('nav-toggle');
    document.body.appendChild(navToggle);

    navToggle.addEventListener('click', () => {
        document.querySelector('nav ul').classList.toggle('show');
    });

    // Add accordion functionality for services
    const services = document.querySelectorAll('.service');

    services.forEach(service => {
        service.addEventListener('click', () => {
            service.classList.toggle('active');
        });
    });

    // Add modal functionality for the contact form
    const modal = document.querySelector('.modal');
    const quoteForm = document.getElementById('quoteForm');
    const contactButton = document.getElementById('contactButton');
    const closeBtn = document.getElementsByClassName('close')[0];

    contactButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form Submission Handling with fetch
    quoteForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(quoteForm);

        fetch('process_form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Form submitted successfully');
                // Add any additional actions you want to perform on success
            } else {
                console.error('Error submitting form:', data.message);
                // Add any additional actions you want to perform on error
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle fetch or other errors
        });
    });
});
