document.addEventListener("DOMContentLoaded", function () {
    // Fetch the general office and website data
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const office = data.office;
        document.querySelector('.office-address').innerHTML = office.address;
        document.querySelector('.office-phone').innerHTML = office.phone;
        document.querySelector('.office-email').innerHTML = office.email;
      
        // Set social media links
        document.querySelector('.social-twitter').href = office.social_links.twitter;
        document.querySelector('.social-facebook').href = office.social_links.facebook;
        document.querySelector('.social-youtube').href = office.social_links.youtube;
        document.querySelector('.social-linkedin').href = office.social_links.linkedin;
        document.querySelector('.social-instagram').href = office.social_links.instagram;
      
        // Populate photo gallery
        const galleryContainer = document.querySelector('.photo-gallery');
        galleryContainer.innerHTML = '';  // Clear existing content
        office.images.forEach(img => {
            const imgElement = document.createElement('div');
            imgElement.classList.add('col-4');
            imgElement.innerHTML = `<img class="img-fluid bg-light rounded p-1" src="${img}" alt="Image">`;
            galleryContainer.appendChild(imgElement);
        });
       
        // Set website name and phone
        const websiteName = data.website.name;
        const contactPhone = data.website.contact.phone;

        document.getElementById('website-name').textContent = websiteName;
        document.getElementById('website-name2').innerText = websiteName;
        
        // Set contact phone dynamically
        document.getElementById('contact-phone').textContent = contactPhone;
        const contactPhoneLink = document.querySelector('a[href^="tel:"]');
        if (contactPhoneLink) {
            contactPhoneLink.setAttribute('href', `tel:${contactPhone}`);
        }
       
        const locationLink = document.getElementById('location-link');
        if (locationLink) {
            locationLink.href = data.office.maps_link; // Dynamically set the map link
        }
        const contactLocation = document.getElementById('contact-location');
        contactLocation.textContent = data.office.address;

      
       
        // Set the developer's LinkedIn profile link
        const developerName = data.website.Developer.name;
        const developerLinkedIn = data.website.Developer.linkedin;
        document.getElementById('developer-name').innerHTML = `<a href="${developerLinkedIn}" target="_blank">${developerName}</a>`;
        
        // Remove email and LinkedIn button (as per your request)
        document.getElementById('developer-linkedin').style.display = 'none';
    })
    .catch(error => console.error('Error loading the JSON data:', error));
  
    // Fetch the product categories and add them to the dropdown menu
    fetch('products.json')
    .then(response => response.json())
    .then(jsonData => {
        const productsMenu = document.getElementById("products-menu");
        
        jsonData.categories.forEach(category => {
            const categoryLink = document.createElement("a");
            categoryLink.href = `menu.html?category=${category.categoryId}`;
            categoryLink.classList.add("dropdown-item");
            categoryLink.innerText = category.categoryName;
            productsMenu.appendChild(categoryLink);
        });
  
        // Additional dynamic content (if needed)
        console.log(jsonData);
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });
});
