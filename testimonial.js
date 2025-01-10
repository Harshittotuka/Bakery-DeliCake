fetch('reviews.json')
    .then(response => response.json())
    .then(data => {
        // Update customer count
        const customerCountElement = document.getElementById('customer-count');
        customerCountElement.textContent = data.count;

        const testimonials = data.reviews;
        const testimonialSection = document.getElementById('testimonial-section');

        // Clear existing carousel content
        testimonialSection.innerHTML = '';

        // Generate HTML for each review
        testimonials.forEach(review => {
            const testimonialHTML = `
                <div class="testimonial-item bg-white rounded p-4">
                    <div class="d-flex align-items-center mb-4">
                        <img class="flex-shrink-0 rounded-circle border p-1" src="img/customer.png" alt="Client Image">
                        <div class="ms-4">
                            <h5 class="mb-1">${review.name}</h5>
                        </div>
                    </div>
                    <p class="mb-0">${review.review}</p>
                </div>
            `;
            testimonialSection.innerHTML += testimonialHTML;
        });

        // Initialize a variable to hold the carousel instance
        const testimonialCarousel = $('#testimonial-section');

        // Destroy existing carousel if initialized
        testimonialCarousel.trigger('destroy.owl.carousel');

        // Reinitialize the carousel with navigation enabled
        testimonialCarousel.owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            margin: 25,
            dots: true,
            loop: true,
            nav: true, // Enable navigation
            navText: [
                '<i class="fa fa-chevron-left"></i>',
                '<i class="fa fa-chevron-right"></i>'
            ], // Custom navigation buttons
            responsive: {
                0: { items: 1 },
                768: { items: 2 },
                992: { items: 3 }
            }
        });
    })
    .catch(error => console.error('Error fetching testimonials:', error));

// Load images and reinitialize carousel after they're loaded
const images = document.querySelectorAll('#testimonial-section img');
const promises = Array.from(images).map(img => new Promise(resolve => (img.onload = resolve)));

Promise.all(promises).then(() => {
    // Reinitialize the carousel after all images are loaded
    const testimonialCarousel = $('#testimonial-section');
    testimonialCarousel.owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            992: { items: 3 }
        }
    });
});
